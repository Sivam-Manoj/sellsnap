import { Router } from "express";
import { getTrendAnalysis, getTrends, deleteTrend } from '../controller/trendController.js';
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', protect, getTrends);
router.post('/', protect, getTrendAnalysis);
router.delete('/:id', protect, deleteTrend);

export default router;
