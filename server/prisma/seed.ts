import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // ─── 1. Create Tenant ─────────────────────────────────────────
  const tenant = await prisma.tenant.create({
    data: { name: 'FMC Abeokuta NHIA Pharmacy Unit' },
  });
  const tenantId = tenant.id;
  console.log(`Created tenant: ${tenant.name} (${tenantId})`);

  // ─── 2. Create Permissions ────────────────────────────────────
  const permissionActions = [
    'INVENTORY_READ',
    'INVENTORY_WRITE',
    'TRANSFER_CREATE',
    'TRANSFER_READ',
    'TRANSFER_APPROVE',
    'REPORT_VIEW',
    'USER_MANAGE',
  ];

  const permissions: Record<string, { id: string }> = {};
  for (const action of permissionActions) {
    const perm = await prisma.permission.create({
      data: { action, tenantId },
    });
    permissions[action] = perm;
  }
  console.log(`Created ${permissionActions.length} permissions`);

  // ─── 3. Create Roles with Permissions ─────────────────────────
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      tenantId,
      permissions: {
        connect: Object.values(permissions).map((p) => ({ id: p.id })),
      },
    },
  });

  const mainStoreRole = await prisma.role.create({
    data: {
      name: 'Main Store Officer',
      tenantId,
      permissions: {
        connect: [
          permissions['INVENTORY_READ'],
          permissions['INVENTORY_WRITE'],
          permissions['TRANSFER_CREATE'],
          permissions['TRANSFER_READ'],
        ].map((p) => ({ id: p.id })),
      },
    },
  });

  const subStoreRole = await prisma.role.create({
    data: {
      name: 'Sub Store Officer',
      tenantId,
      permissions: {
        connect: [
          permissions['INVENTORY_READ'],
          permissions['TRANSFER_CREATE'],
          permissions['TRANSFER_READ'],
          permissions['TRANSFER_APPROVE'],
        ].map((p) => ({ id: p.id })),
      },
    },
  });

  const dispensaryRole = await prisma.role.create({
    data: {
      name: 'Dispensary Officer',
      tenantId,
      permissions: {
        connect: [
          permissions['INVENTORY_READ'],
          permissions['TRANSFER_CREATE'],
          permissions['TRANSFER_READ'],
          permissions['TRANSFER_APPROVE'],
        ].map((p) => ({ id: p.id })),
      },
    },
  });

  console.log('Created roles: Admin, Main Store Officer, Sub Store Officer, Dispensary Officer');

  // ─── 4. Create Departments ────────────────────────────────────
  const mainStore = await prisma.department.create({
    data: { name: 'Main Store', type: 'Main Store', tenantId },
  });

  const subStore = await prisma.department.create({
    data: { name: 'Sub Store', type: 'Sub Store', tenantId },
  });

  const dispensary = await prisma.department.create({
    data: { name: 'Outpatient Dispensary', type: 'Dispensary', tenantId },
  });

  console.log('Created departments: Main Store, Sub Store, Outpatient Dispensary');

  // ─── 5. Create Users ─────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.create({
    data: {
      fullName: 'System Admin',
      email: 'admin@nhia.gov.ng',
      passwordHash,
      role: 'Admin',
      roleId: adminRole.id,
      departmentId: mainStore.id,
      tenantId,
    },
  });

  const mainStoreOfficer = await prisma.user.create({
    data: {
      fullName: 'John Doe',
      email: 'mainstore@nhia.gov.ng',
      passwordHash,
      role: 'Main Store Officer',
      roleId: mainStoreRole.id,
      departmentId: mainStore.id,
      tenantId,
    },
  });

  await prisma.user.create({
    data: {
      fullName: 'Jane Smith',
      email: 'substore@nhia.gov.ng',
      passwordHash,
      role: 'Sub Store Officer',
      roleId: subStoreRole.id,
      departmentId: subStore.id,
      tenantId,
    },
  });

  await prisma.user.create({
    data: {
      fullName: 'Alice Johnson',
      email: 'dispensary@nhia.gov.ng',
      passwordHash,
      role: 'Dispensary Officer',
      roleId: dispensaryRole.id,
      departmentId: dispensary.id,
      tenantId,
    },
  });

  console.log('Created 4 users');

  // ─── 6. Create Inventory Items ────────────────────────────────
  const paracetamol = await prisma.inventoryItem.create({
    data: {
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      category: 'Analgesics',
      unitType: 'Tablet',
      reorderLevel: 500,
      departmentId: mainStore.id,
      tenantId,
    },
  });

  const amoxicillin = await prisma.inventoryItem.create({
    data: {
      name: 'Amoxicillin 500mg',
      genericName: 'Amoxicillin',
      category: 'Antibiotics',
      unitType: 'Capsule',
      reorderLevel: 200,
      departmentId: mainStore.id,
      tenantId,
    },
  });

  // ─── 7. Create Batches ────────────────────────────────────────
  const batch1 = await prisma.inventoryBatch.create({
    data: {
      inventoryItemId: paracetamol.id,
      batchNumber: 'PARA-001',
      expiryDate: new Date('2028-12-31'),
      quantity: 5000,
      costPrice: 5.0,
      profitMargin: 20,
      sellingPrice: 5.0 + (20 / 100) * 5.0,
      tenantId,
    },
  });

  await prisma.inventoryBatch.create({
    data: {
      inventoryItemId: amoxicillin.id,
      batchNumber: 'AMOX-001',
      expiryDate: new Date('2027-06-30'),
      quantity: 1000,
      costPrice: 20.0,
      profitMargin: 15,
      sellingPrice: 20.0 + (15 / 100) * 20.0,
      tenantId,
    },
  });

  // ─── 8. Create Sample Transfer ────────────────────────────────
  const transfer = await prisma.transfer.create({
    data: {
      fromDepartmentId: mainStore.id,
      toDepartmentId: subStore.id,
      status: 'Pending',
      transferredById: mainStoreOfficer.id,
      tenantId,
    },
  });

  await prisma.transferItem.create({
    data: {
      transferId: transfer.id,
      batchId: batch1.id,
      quantity: 500,
      tenantId,
    },
  });

  console.log('Created sample inventory items, batches, and transfer');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
