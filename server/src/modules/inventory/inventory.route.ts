import express from 'express';
import { getItems, createItem, createBatch } from './inventory.controller';
import { requirePermission } from '../../middleware/rbac';

const router = express.Router();

// Auth + RBAC are already applied at the app level in index.ts
// Here we only add route-specific permission checks

router.get('/items', requirePermission('INVENTORY_READ'), getItems);
router.post('/items', requirePermission('INVENTORY_WRITE'), createItem);
router.post('/batches', requirePermission('INVENTORY_WRITE'), createBatch);

export default router;
