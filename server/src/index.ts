import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';


import inventoryRoutes from './modules/inventory/inventory.route';
import transfersRoutes from './modules/transfers/transfers.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'NHIA Pharmacy API is running' });
});

// Register Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/transfers', transfersRoutes);

app.get('/api/departments', async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
