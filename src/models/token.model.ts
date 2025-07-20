import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  userId: string;
  token: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const TokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);

export default Token;
