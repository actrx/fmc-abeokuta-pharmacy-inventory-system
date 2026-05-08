import express from 'express';
import { getItems, createItem, createBatch } from './inventory.controller';

const router = express.Router();

router.get('/items', getItems);
router.post('/items', createItem);
router.post('/batches', createBatch);

export default router;
