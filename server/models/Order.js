import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);