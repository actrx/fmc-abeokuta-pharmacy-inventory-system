import express from 'express';
import { createTransfer, approveTransfer } from './transfers.controller';

const router = express.Router();

router.post('/', createTransfer);
router.post('/:transferId/approve', approveTransfer);

export default router;
