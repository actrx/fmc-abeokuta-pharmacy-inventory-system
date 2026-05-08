import express from 'express';
import { getItems, createItem, createBatch } from './inventory.controller';
import { protect, authorize } from '../../middleware/auth.middleware';

const router = express.Router();

router.use(protect); // All inventory routes require auth

router.get('/items', getItems);
router.post('/items', authorize('Admin', 'Main Store Officer'), createItem);
router.post('/batches', authorize('Admin', 'Main Store Officer'), createBatch);

export default router;
