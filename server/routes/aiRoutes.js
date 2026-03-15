import express from 'express';
import { analyzeCode, getHistory } from '../controllers/aiController.js';
import protectRoute from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', protectRoute, analyzeCode);
router.get('/history', protectRoute, getHistory);

export default router;
