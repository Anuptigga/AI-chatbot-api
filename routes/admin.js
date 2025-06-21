import express from 'express';
import { getAIUsageStats } from '../controllers/adminControllers.js';
import { authenticated } from '../middlewares/authMiddleware.js';
import { requireAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router()
router.get('/stats',authenticated, requireAdmin ,getAIUsageStats);
export default router;