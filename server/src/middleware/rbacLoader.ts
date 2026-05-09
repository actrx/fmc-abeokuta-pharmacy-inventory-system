import { Request, Response, NextFunction } from 'express';
import { requestContext } from './requestContext';
import { PrismaClient } from '@prisma/client';

/**
 * RBAC Loader middleware.
 *
 * Runs AFTER authTenantResolver. Reads the user's role and tenantId
 * from AsyncLocalStorage, queries the database for the role's permissions,
 * and populates ctx.permissions with a fresh set.
 *
 * This ensures permissions are always up-to-date (not stale from JWT).
 */
export function createRbacLoader(prisma: PrismaClient) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ctx = requestContext.getStore();
    if (!ctx) {
      return res.status(500).json({ error: 'Request context not initialized' });
    }

    try {
      const role = await prisma.role.findFirst({
        where: { name: ctx.role, tenantId: ctx.tenantId },
        include: { permissions: true },
      });

      if (!role) {
        return res.status(403).json({ error: `Role "${ctx.role}" not found for this tenant` });
      }

      ctx.permissions = new Set(role.permissions.map((p: { action: string }) => p.action));

      // Also attach to req for backward compat
      (req as any).user = {
        ...(req as any).user,
        permissions: Array.from(ctx.permissions),
      };

      next();
    } catch (err) {
      return res.status(500).json({ error: 'Failed to load permissions' });
    }
  };
}
