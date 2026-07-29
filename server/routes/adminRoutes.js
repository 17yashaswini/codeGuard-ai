import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import protectRoute from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protectRoute, getAdminStats);

export default router;