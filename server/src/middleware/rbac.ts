import { Request, Response, NextFunction } from 'express';
import { requestContext } from './requestContext';

/**
 * Route-level permission guard.
 *
 * Usage:
 *   router.get('/items', requirePermission('INVENTORY_READ'), getItems);
 *
 * Reads permissions from the AsyncLocalStorage context (populated by rbacLoader).
 * Returns 403 if the required permission is not present.
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ctx = requestContext.getStore();
    if (!ctx) {
      return res.status(500).json({ error: 'Request context not initialized' });
    }

    if (!ctx.permissions.has(permission)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Missing required permission: ${permission}`,
      });
    }

    next();
  };
};
