import express from 'express';
import { getAIUsageStats } from '../controllers/adminControllers.js';

const router = express.Router()
router.get('/stats',getAIUsageStats);
export default router;