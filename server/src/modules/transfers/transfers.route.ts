import express from 'express';
import { createTransfer, approveTransfer } from './transfers.controller';
import { protect, authorize } from '../../middleware/auth.middleware';

const router = express.Router();

router.use(protect); // All transfer routes require auth

router.post('/', authorize('Main Store Officer', 'Sub Store Officer', 'Dispensary Officer'), createTransfer);
router.post('/:transferId/approve', authorize('Sub Store Officer', 'Dispensary Officer'), approveTransfer);

export default router;
