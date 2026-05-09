import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * Auth router — login endpoint.
 *
 * POST /api/auth/login — public endpoint (no auth required)
 *
 * Issues a JWT with { sub: userId, email, tenantId, role }
 */
export function createAuthRouter(prisma: PrismaClient) {
  const router = express.Router();

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({ error: 'JWT_SECRET not configured' });
      }

      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          tenantId: user.tenantId,
          role: user.role,
        },
        secret,
        { expiresIn: '7d' }
      );

      // Log login event to audit (using raw prisma to avoid middleware)
      const { rawPrisma } = require('../prisma/rawPrisma');
      try {
        await rawPrisma.auditLog.create({
          data: {
            tenantId: user.tenantId,
            userId: user.id,
            action: 'LOGIN',
            entity: 'User',
            entityId: user.id,
          },
        });
      } catch (auditErr) {
        console.error('[AuditLog] Failed to log login:', auditErr);
      }

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          tenantId: user.tenantId,
          departmentId: user.departmentId,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      console.error('[AuthRouter] Error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  return router;
}
