import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import Order from '../models/Order.js';
import User from '../models/User.js';

const CREDIT_PLANS = {
  starter: { credits: 20, amount: 4900 },   // ₹49
  pro: { credits: 60, amount: 12900 },      // ₹129
  business: { credits: 150, amount: 29900 }, // ₹299
};

export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const selected = CREDIT_PLANS[plan];
    if (!selected) return res.status(400).json({ success: false, message: 'Invalid plan' });

    const razorpayOrder = await razorpay.orders.create({
      amount: selected.amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    await Order.create({
      userId: req.user.id,
      razorpayOrderId: razorpayOrder.id,
      amount: selected.amount,
      credits: selected.credits,
      status: 'created',
    });

    res.status(200).json({ success: true, order: razorpayOrder, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.status === 'paid') return res.status(200).json({ success: true, message: 'Already processed' });

    order.status = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    const user = await User.findOne({ clerkId: req.user.id });
    user.credits += order.credits;
    await user.save();

    res.status(200).json({ success: true, credits: user.credits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};