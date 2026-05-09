import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { requestContext, RequestStore } from './requestContext';

/**
 * Auth + Tenant Resolver middleware.
 *
 * 1. Extracts and verifies the JWT from Authorization header
 * 2. Reads userId (sub), tenantId, and role from the token payload
 * 3. Wraps the downstream handler inside AsyncLocalStorage.run()
 *    so that all code in this request chain can access the context safely
 *
 * JWT payload must contain: { sub: string, tenantId: string, role: string }
 */
export const authTenantResolver = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT_SECRET not configured' });
    }

    const payload = jwt.verify(token, secret) as {
      sub: string;
      tenantId: string;
      role: string;
    };

    if (!payload.sub || !payload.tenantId || !payload.role) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const store: RequestStore = {
      userId: payload.sub,
      tenantId: payload.tenantId,
      role: payload.role,
      permissions: new Set(), // will be hydrated by rbacLoader
    };

    // Attach user info to request for backward compatibility with existing controllers
    (req as any).user = {
      id: payload.sub,
      tenantId: payload.tenantId,
      role: payload.role,
    };

    // Run the rest of the request chain inside scoped context
    requestContext.run(store, () => next());
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
