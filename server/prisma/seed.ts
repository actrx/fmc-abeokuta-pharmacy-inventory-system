import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Departments
  const mainStore = await prisma.department.create({
    data: { name: 'Main Store', type: 'Main Store' },
  });
  
  const subStore = await prisma.department.create({
    data: { name: 'Sub Store', type: 'Sub Store' },
  });

  const dispensary = await prisma.department.create({
    data: { name: 'Outpatient Dispensary', type: 'Dispensary' },
  });

  // 2. Create Users
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.create({
    data: {
      fullName: 'System Admin',
      email: 'admin@nhia.gov.ng',
      passwordHash,
      role: 'Admin',
      departmentId: mainStore.id,
    },
  });

  const mainStoreOfficer = await prisma.user.create({
    data: {
      fullName: 'John Doe',
      email: 'mainstore@nhia.gov.ng',
      passwordHash,
      role: 'Main Store Officer',
      departmentId: mainStore.id,
    },
  });

  const subStoreOfficer = await prisma.user.create({
    data: {
      fullName: 'Jane Smith',
      email: 'substore@nhia.gov.ng',
      passwordHash,
      role: 'Sub Store Officer',
      departmentId: subStore.id,
    },
  });

  const dispensaryOfficer = await prisma.user.create({
    data: {
      fullName: 'Alice Johnson',
      email: 'dispensary@nhia.gov.ng',
      passwordHash,
      role: 'Dispensary Officer',
      departmentId: dispensary.id,
    },
  });

  // 3. Create Inventory Items
  const paracetamol = await prisma.inventoryItem.create({
    data: {
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      category: 'Analgesics',
      unitType: 'Tablet',
      reorderLevel: 500,
      departmentId: mainStore.id,
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
    },
  });

  // 4. Create Batches
  const batch1 = await prisma.inventoryBatch.create({
    data: {
      inventoryItemId: paracetamol.id,
      batchNumber: 'PARA-001',
      expiryDate: new Date('2028-12-31'),
      quantity: 5000,
      costPrice: 5.0,
      profitMargin: 20,
      sellingPrice: 5.0 + (20 / 100) * 5.0,
    },
  });

  const batch2 = await prisma.inventoryBatch.create({
    data: {
      inventoryItemId: amoxicillin.id,
      batchNumber: 'AMOX-001',
      expiryDate: new Date('2027-06-30'),
      quantity: 1000,
      costPrice: 20.0,
      profitMargin: 15,
      sellingPrice: 20.0 + (15 / 100) * 20.0,
    },
  });

  // 5. Create Sample Transfer (Main Store -> Sub Store)
  const transfer = await prisma.transfer.create({
    data: {
      fromDepartmentId: mainStore.id,
      toDepartmentId: subStore.id,
      status: 'Pending',
      transferredById: mainStoreOfficer.id,
    },
  });

  await prisma.transferItem.create({
    data: {
      transferId: transfer.id,
      batchId: batch1.id,
      quantity: 500,
    },
  });

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
