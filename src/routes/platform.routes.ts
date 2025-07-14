import express from 'express';
import { handleCreatePlatform, handleDeletePlatform, handleGetPlatforms, handleUpdatePlatform, handleGetRecentPlatforms, getAvailablePlatformsController, addPlatformFromGlobalController } from '../controller/platform.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, handleCreatePlatform);
router.get('/', protect, handleGetPlatforms);
router.get('/recent', protect, handleGetRecentPlatforms);
router.put('/:platformId', protect, handleUpdatePlatform);
router.delete('/:platformId', protect, handleDeletePlatform);

router.get('/available', protect, getAvailablePlatformsController);
router.post('/add/:platformId', protect, addPlatformFromGlobalController);

export default router;
