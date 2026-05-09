import { PrismaClient } from '@prisma/client';
import { requestContext } from './requestContext';
import { rawPrisma } from '../prisma/rawPrisma';

/**
 * Audit logging Prisma middleware.
 *
 * Logs CREATE, UPDATE, DELETE operations to the audit_logs table
 * using the rawPrisma client (no middleware) to prevent:
 * - Infinite recursion
 * - Double logging
 *
 * Skips logging for the AuditLog model itself as a safety guard.
 */
export function registerAuditMiddleware(prisma: PrismaClient) {
  const LOGGED_ACTIONS = new Set(['create', 'update', 'delete']);

  prisma.$use(async (params: any, next: any) => {
    const result = await next(params);

    // Skip audit logging for the AuditLog model (prevents recursion)
    if (params.model === 'AuditLog') return result;

    const ctx = requestContext.getStore();
    if (!ctx?.tenantId || !ctx?.userId) return result;

    if (params.model && LOGGED_ACTIONS.has(params.action)) {
      try {
        await rawPrisma.auditLog.create({
          data: {
            tenantId: ctx.tenantId,
            userId: ctx.userId,
            action: params.action.toUpperCase(),
            entity: params.model,
            entityId: (result?.id ?? 'unknown') as string,
          },
        });
      } catch (err) {
        // Audit logging should never break the main operation
        console.error('[AuditLog] Failed to log:', err);
      }
    }

    return result;
  });
}
