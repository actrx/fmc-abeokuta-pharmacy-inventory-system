import { PrismaClient } from '@prisma/client';

/**
 * Inventory service with foreign key validation.
 *
 * All write operations validate that related entities
 * (e.g. departmentId) belong to the same tenant before proceeding.
 * This prevents cross-tenant data linking via nested writes.
 */

export interface CreateInventoryItemInput {
  name: string;
  genericName: string;
  category: string;
  unitType: string;
  departmentId: string;
  reorderLevel: number;
}

export interface CreateBatchInput {
  inventoryItemId: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  costPrice: number;
  profitMargin: number;
}

export async function createInventoryItem(
  prisma: PrismaClient,
  tenantId: string,
  data: CreateInventoryItemInput
) {
  // Validate that the department belongs to this tenant
  await prisma.department.findFirstOrThrow({
    where: { id: data.departmentId, tenantId },
  });

  return prisma.inventoryItem.create({
    data: {
      ...data,
      tenantId,
    },
  });
}

export async function createBatch(
  prisma: PrismaClient,
  tenantId: string,
  data: CreateBatchInput
) {
  // Validate that the inventory item belongs to this tenant
  await prisma.inventoryItem.findFirstOrThrow({
    where: { id: data.inventoryItemId, tenantId },
  });

  const sellingPrice = data.costPrice + (data.profitMargin / 100) * data.costPrice;

  return prisma.inventoryBatch.create({
    data: {
      inventoryItemId: data.inventoryItemId,
      batchNumber: data.batchNumber,
      expiryDate: data.expiryDate,
      quantity: data.quantity,
      costPrice: data.costPrice,
      profitMargin: data.profitMargin,
      sellingPrice,
      tenantId,
    },
  });
}
