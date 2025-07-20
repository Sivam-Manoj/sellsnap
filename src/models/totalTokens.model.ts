import mongoose, { Schema, Document } from "mongoose";

export interface ITotalTokens extends Document {
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  createdAt: Date;
  updatedAt: Date;
}

const TotalTokensSchema: Schema = new Schema({
  totalTokens: { type: Number, required: true },
  totalInputTokens: { type: Number, required: true },
  totalOutputTokens: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TotalTokens = mongoose.model<ITotalTokens>(
  "TotalTokens",
  TotalTokensSchema
);

export default TotalTokens;
