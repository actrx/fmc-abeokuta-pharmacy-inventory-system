import express from 'express';
import { createTransfer, approveTransfer } from './transfers.controller';
import { requirePermission } from '../../middleware/rbac';

const router = express.Router();

// Auth + RBAC are already applied at the app level in index.ts
// Here we only add route-specific permission checks

router.post('/', requirePermission('TRANSFER_CREATE'), createTransfer);
router.post('/:transferId/approve', requirePermission('TRANSFER_APPROVE'), approveTransfer);

export default router;
