import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import protectRoute from '../middleware/auth.js';

const router = express.Router();

router.post('/create-order', protectRoute, createOrder);
router.post('/verify', protectRoute, verifyPayment);

export default router;