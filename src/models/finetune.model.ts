import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FinetuneInput {
  baseModelId: string;
  status: string;
  storyIds: string[];
}

export interface FinetuneDocument extends FinetuneInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const finetuneSchema = new mongoose.Schema(
  {
    finetuneId: {
      type: String,
      required: true,
      unique: true,
      default: () => `${nanoid()}`,
    },
    baseModelId: { type: String, required: true },
    status: { type: String, required: true },
    storyIds: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const FinetuneModel = mongoose.model<FinetuneDocument>("Finetune", finetuneSchema);

export default FinetuneModel;
