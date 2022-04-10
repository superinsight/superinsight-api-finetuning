import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
export interface StoryInput {
  name?: string;
  text: string;
}

export interface StoryDocument extends StoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  storyId: string;
}

const storySchema = new mongoose.Schema(
  {
    storyId: {
      type: String,
      required: true,
      unique: true,
      default: () => `${nanoid()}`,
    },
    name: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

storySchema.pre("save", async function (next) {
  let story = this as StoryDocument;
  //further data prep if needed
  return next();
});

const StoryModel = mongoose.model<StoryDocument>("Story", storySchema);

export default StoryModel;
