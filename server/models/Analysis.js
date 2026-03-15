import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  result: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'low' },
}, { timestamps: true });

export default mongoose.model('Analysis', analysisSchema);