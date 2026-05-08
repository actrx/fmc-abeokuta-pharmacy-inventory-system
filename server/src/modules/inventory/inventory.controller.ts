import { Request, Response } from 'express';
import { prisma } from '../../index';
import { z } from 'zod';

const createItemSchema = z.object({
  name: z.string(),
  genericName: z.string(),
  category: z.string(),
  unitType: z.string(),
  reorderLevel: z.number().int().min(0)
});

const createBatchSchema = z.object({
  inventoryItemId: z.string().uuid(),
  batchNumber: z.string(),
  expiryDate: z.string(), // ISO string expected
  quantity: z.number().int().min(1),
  costPrice: z.number().positive(),
  profitMargin: z.number().positive()
});

export const getItems = async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.findFirst();
    const departmentId = (req.query.departmentId as string) || department?.id;
    if (!departmentId) return res.status(400).json({ message: 'No department found' });
    const items = await prisma.inventoryItem.findMany({
      where: { departmentId },
      include: {
        batches: {
          where: { quantity: { gt: 0 } },
          orderBy: { expiryDate: 'asc' }
        }
      }
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching inventory items' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.findFirst();
    const departmentId = req.body.departmentId || department?.id;
    if (!departmentId) return res.status(400).json({ message: 'No department found' });
    const data = createItemSchema.parse(req.body);

    const newItem = await prisma.inventoryItem.create({
      data: {
        ...data,
        departmentId
      }
    });

    res.status(201).json(newItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error creating inventory item' });
  }
};

export const createBatch = async (req: Request, res: Response) => {
  try {
    const data = createBatchSchema.parse(req.body);
    const sellingPrice = data.costPrice + ((data.profitMargin / 100) * data.costPrice);

    const newBatch = await prisma.inventoryBatch.create({
      data: {
        inventoryItemId: data.inventoryItemId,
        batchNumber: data.batchNumber,
        expiryDate: new Date(data.expiryDate),
        quantity: data.quantity,
        costPrice: data.costPrice,
        profitMargin: data.profitMargin,
        sellingPrice
      }
    });

    res.status(201).json(newBatch);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error creating batch' });
  }
};
