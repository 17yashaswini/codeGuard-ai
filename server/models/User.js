import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  credits: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);