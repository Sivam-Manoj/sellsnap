import mongoose, { Document, Schema } from 'mongoose';

export interface ITrend extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  product: string;
  marketplace: string;
  country: string;
  data: any; // To store the analysis result
  createdAt: Date;
}

const TrendSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  marketplace: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ITrend>('Trend', TrendSchema);
