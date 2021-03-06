import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FinetuneInput {
  baseModelId: string;
  state: string;
  storyIds: string[];
  storyTags: string[];
  tokenizerName?: string;
  learningRate?: string;
}

export interface FinetuneDocument extends FinetuneInput, mongoose.Document {
  finetuneId: string;
  createdAt: Date;
  updatedAt: Date;
  state: string;
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
    state: { type: String, required: true },
    storyIds: { type: [String], required: true },
    storyTags: { type: [String], required: true },
    tokenizerName: { type: String, required: false},
    learningRate: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const FinetuneModel = mongoose.model<FinetuneDocument>("Finetune", finetuneSchema);

export default FinetuneModel;
