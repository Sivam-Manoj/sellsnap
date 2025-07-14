import { Router } from 'express';
import { getUserProfile, deleteUserAccount } from '../controller/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/me', protect, getUserProfile);
router.delete('/', protect, deleteUserAccount);

export default router;
