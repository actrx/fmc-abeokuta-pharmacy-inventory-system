import { PrismaClient } from '@prisma/client';

/**
 * Seeds all base data for a newly created tenant.
 *
 * Creates:
 * - Default departments (Main Store, Sub Store, Dispensary)
 * - Permission records for all system actions
 * - Default roles (Admin, Main Store Officer, Sub Store Officer, Dispensary Officer)
 *   with appropriate permission mappings
 *
 * This ensures the UI works immediately after tenant creation.
 */
export async function seedTenantData(prisma: PrismaClient, tenantId: string) {
  // ─── 1. Permissions ─────────────────────────────────────────
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

  // ─── 2. Roles ───────────────────────────────────────────────
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      tenantId,
      permissions: {
        connect: Object.values(permissions).map((p) => ({ id: p.id })),
      },
    },
  });

  await prisma.role.create({
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

  await prisma.role.create({
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

  await prisma.role.create({
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

  // ─── 3. Departments ─────────────────────────────────────────
  await prisma.department.createMany({
    data: [
      { name: 'Main Store', type: 'Main Store', tenantId },
      { name: 'Sub Store', type: 'Sub Store', tenantId },
      { name: 'Dispensary', type: 'Dispensary', tenantId },
    ],
    skipDuplicates: true,
  });

  return { adminRoleId: adminRole.id };
}
