import { Prisma, PrismaClient } from '@prisma/client';
import { requestContext } from './requestContext';

/**
 * Models that have a tenantId column and need automatic tenant scoping.
 * Explicit whitelist — no reliance on internal Prisma APIs (_dmmf).
 */
const TENANTED_MODELS = new Set([
  'User',
  'Department',
  'InventoryItem',
  'InventoryBatch',
  'Transfer',
  'TransferItem',
  'ReorderAlert',
  'AuditLog',
  'StockAdjustment',
  'Role',
  'Permission',
]);

/**
 * Registers a Prisma middleware that automatically injects tenantId
 * into all queries for tenanted models.
 *
 * Action-specific handling:
 * - findMany/findFirst → spread tenantId into args.where
 * - findUnique → spread tenantId into args.where (works with @@unique([id, tenantId]))
 * - create → force tenantId, reject mismatches
 * - update/delete → spread tenantId into args.where
 */
export function registerTenantMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
    const ctx = requestContext.getStore();

    // If no context (e.g., seed scripts, tenant creation), skip
    if (!ctx?.tenantId) {
      return next(params);
    }

    const { model, action, args } = params;

    // Skip non-tenanted models
    if (!model || !TENANTED_MODELS.has(model)) {
      return next(params);
    }

    const tenantId = ctx.tenantId;

    // ────── READ ──────
    if (['findMany', 'findFirst', 'findFirstOrThrow'].includes(action)) {
      args.where = { ...(args.where ?? {}), tenantId };
    }

    if (action === 'findUnique' || action === 'findUniqueOrThrow') {
      // Composite unique @@unique([id, tenantId]) allows this
      args.where = { ...(args.where ?? {}), tenantId };
    }

    // ────── CREATE ──────
    if (action === 'create') {
      // Reject if caller tried to sneak in a different tenantId
      if (args.data?.tenantId && args.data.tenantId !== tenantId) {
        throw new Error('Tenant mismatch: cannot create resource for another tenant');
      }
      args.data = { ...(args.data ?? {}), tenantId };
    }

    if (action === 'createMany') {
      if (Array.isArray(args.data)) {
        args.data = args.data.map((item: any) => {
          if (item.tenantId && item.tenantId !== tenantId) {
            throw new Error('Tenant mismatch in createMany');
          }
          return { ...item, tenantId };
        });
      }
    }

    // ────── UPDATE ──────
    if (['update', 'updateMany'].includes(action)) {
      args.where = { ...(args.where ?? {}), tenantId };
    }

    // ────── DELETE ──────
    if (['delete', 'deleteMany'].includes(action)) {
      args.where = { ...(args.where ?? {}), tenantId };
    }

    // ────── COUNT / AGGREGATE ──────
    if (['count', 'aggregate', 'groupBy'].includes(action)) {
      args.where = { ...(args.where ?? {}), tenantId };
    }

    return next(params);
  });
}
