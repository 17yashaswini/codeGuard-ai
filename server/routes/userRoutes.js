import express from 'express';
import { syncUser, getCredits } from '../controllers/userController.js';
import protectRoute from '../middleware/auth.js';

const router = express.Router();

router.post('/sync', protectRoute, syncUser);
router.get('/credits', protectRoute, getCredits);

export default router;