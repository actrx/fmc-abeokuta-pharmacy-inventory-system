import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { seedTenantData } from '../services/tenantSeeder';

const createTenantSchema = z.object({
  tenantName: z.string().min(2, 'Tenant name must be at least 2 characters'),
  adminFullName: z.string().min(2),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

/**
 * Creates the tenant router.
 *
 * POST /api/tenants — public endpoint (no auth required)
 *
 * 1. Creates a new Tenant record
 * 2. Seeds base data (departments, permissions, roles)
 * 3. Creates the initial admin user
 * 4. Issues a JWT for the new admin
 */
export function createTenantRouter(prisma: PrismaClient) {
  const router = express.Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      const data = createTenantSchema.parse(req.body);

      // Check if admin email is already taken
      const existingUser = await prisma.user.findUnique({
        where: { email: data.adminEmail },
      });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // 1. Create tenant
      const tenant = await prisma.tenant.create({
        data: { name: data.tenantName },
      });

      // 2. Seed base data (departments, permissions, roles)
      const { adminRoleId } = await seedTenantData(prisma, tenant.id);

      // 3. Get first department for the admin user
      const mainStore = await prisma.department.findFirst({
        where: { tenantId: tenant.id, type: 'Main Store' },
      });

      if (!mainStore) {
        return res.status(500).json({ error: 'Seed data missing: Main Store department' });
      }

      // 4. Create admin user
      const passwordHash = await bcrypt.hash(data.adminPassword, 10);
      const adminUser = await prisma.user.create({
        data: {
          fullName: data.adminFullName,
          email: data.adminEmail,
          passwordHash,
          role: 'Admin',
          roleId: adminRoleId,
          departmentId: mainStore.id,
          tenantId: tenant.id,
        },
      });

      // 5. Issue JWT
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({ error: 'JWT_SECRET not configured' });
      }

      const token = jwt.sign(
        {
          sub: adminUser.id,
          email: adminUser.email,
          tenantId: tenant.id,
          role: 'Admin',
        },
        secret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        tenantId: tenant.id,
        tenantName: tenant.name,
        userId: adminUser.id,
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      console.error('[TenantRouter] Error:', error);
      res.status(500).json({ error: 'Failed to create tenant' });
    }
  });

  return router;
}
