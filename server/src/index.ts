import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Middleware
import { authTenantResolver } from './middleware/authTenantResolver';
import { createRbacLoader } from './middleware/rbacLoader';
import { registerTenantMiddleware } from './middleware/prismaTenant';
import { registerAuditMiddleware } from './middleware/audit';

// Routes
import { createTenantRouter } from './routes/tenant';
import { createAuthRouter } from './routes/auth';
import inventoryRoutes from './modules/inventory/inventory.route';
import transfersRoutes from './modules/transfers/transfers.route';

dotenv.config();

// ─── Prisma Client with Middlewares ──────────────────────────
export const prisma = new PrismaClient();

// Register Prisma-level middlewares (order matters: tenant first, then audit)
registerTenantMiddleware(prisma);
registerAuditMiddleware(prisma);

// ─── Express App ─────────────────────────────────────────────
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Public Routes (no auth required) ────────────────────────
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'NHIA Pharmacy API is running' });
});

app.use('/api/tenants', createTenantRouter(prisma));
app.use('/api/auth', createAuthRouter(prisma));

// ─── Protected Routes ────────────────────────────────────────
// Middleware execution order (strict):
// 1. authTenantResolver → sets AsyncLocalStorage context
// 2. rbacLoader → hydrates permissions from DB (inside the context)
// 3. route-level requirePermission() → checks specific permission

app.use('/api/inventory', authTenantResolver, createRbacLoader(prisma), inventoryRoutes);
app.use('/api/transfers', authTenantResolver, createRbacLoader(prisma), transfersRoutes);

app.get('/api/departments', authTenantResolver, createRbacLoader(prisma), async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

// ─── Start Server ────────────────────────────────────────────
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
