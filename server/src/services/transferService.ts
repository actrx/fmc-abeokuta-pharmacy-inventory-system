import { PrismaClient } from '@prisma/client';

/**
 * Transfer service with foreign key validation and flow rules.
 *
 * Validates:
 * 1. Both departments belong to the current tenant
 * 2. Transfer direction follows business rules:
 *    - Main Store → Sub Store (one-way only)
 *    - Sub Store ↔ Dispensary (bi-directional)
 *    - Main Store → Dispensary (NOT allowed)
 *    - Any → Main Store (NOT allowed)
 * 3. All batches belong to the current tenant
 * 4. Sufficient stock in each batch
 */

export interface CreateTransferInput {
  fromDepartmentId: string;
  toDepartmentId: string;
  transferredById: string;
  items: Array<{ batchId: string; quantity: number }>;
}

export async function createTransfer(
  prisma: PrismaClient,
  tenantId: string,
  data: CreateTransferInput
) {
  // 1. Validate both departments belong to this tenant
  const fromDept = await prisma.department.findFirstOrThrow({
    where: { id: data.fromDepartmentId, tenantId },
  });

  const toDept = await prisma.department.findFirstOrThrow({
    where: { id: data.toDepartmentId, tenantId },
  });

  // 2. Validate transfer flow rules
  if (fromDept.type === 'Main Store' && toDept.type === 'Dispensary') {
    throw new Error('Direct transfer from Main Store to Dispensary is not allowed');
  }
  if (toDept.type === 'Main Store') {
    throw new Error('Reverse transfer to Main Store is not allowed');
  }
  if (fromDept.type === 'Dispensary' && toDept.type === 'Main Store') {
    throw new Error('Transfer from Dispensary to Main Store is not allowed');
  }

  // 3. Validate all batches belong to this tenant
  for (const item of data.items) {
    await prisma.inventoryBatch.findFirstOrThrow({
      where: { id: item.batchId, tenantId },
    });
  }

  // 4. Execute within a transaction
  return prisma.$transaction(async (tx) => {
    const transfer = await tx.transfer.create({
      data: {
        fromDepartmentId: data.fromDepartmentId,
        toDepartmentId: data.toDepartmentId,
        status: 'Pending',
        transferredById: data.transferredById,
        tenantId,
        transferItems: {
          create: data.items.map((item) => ({
            batchId: item.batchId,
            quantity: item.quantity,
            tenantId,
          })),
        },
      },
      include: { transferItems: true },
    });

    // Deduct stock from source batches
    for (const item of data.items) {
      const batch = await tx.inventoryBatch.findFirstOrThrow({
        where: { id: item.batchId, tenantId },
      });

      if (batch.quantity < item.quantity) {
        throw new Error(`Insufficient quantity in batch ${item.batchId}`);
      }

      await tx.inventoryBatch.update({
        where: { id: item.batchId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    return transfer;
  });
}
