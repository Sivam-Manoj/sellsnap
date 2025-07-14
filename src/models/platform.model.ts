import mongoose, { Document, Schema } from 'mongoose';

export interface IField {
  name: string;
  format: 'text' | 'number' | 'list';
  maxLength: string;
  maxLengthEnabled: boolean;
}

export interface IPlatform extends Document {
  name: string;
  fields: IField[];
  extraPoints: string;
  systemMessage: string;
  user: mongoose.Schema.Types.ObjectId;
}

const fieldSchema = new Schema<IField>(
  {
    name: { type: String, required: true },
    format: { type: String, required: true, enum: ['text', 'number', 'list'] },
    maxLength: { type: String, required: false },
    maxLengthEnabled: { type: Boolean, required: true, default: true },
  },
  { _id: false }
);

const platformSchema = new Schema<IPlatform>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: false, 
    },
    fields: {
      type: [fieldSchema],
      required: true,
    },
    extraPoints: {
      type: String,
      trim: true,
    },
    systemMessage: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

platformSchema.index({ user: 1, name: 1 }, { unique: true, partialFilterExpression: { user: { $exists: true } } });

const Platform = mongoose.model<IPlatform>('Platform', platformSchema);

export default Platform;
