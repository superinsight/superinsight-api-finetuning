import { FilterQuery, QueryOptions } from "mongoose";
import StoryModel, { StoryDocument, StoryInput } from "../models/story.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";
const returnProperties = 'name text storyId createdAt updatedAt -_id';
export async function createStory(input: StoryInput) {
  try {
    input.name = input.name || input.text.slice(0, 10).concat('...');
    const story = await StoryModel.create(input);
    return story.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findStory(
  query: FilterQuery<StoryDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findStory",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await StoryModel.findOne(query, {}, options).select(returnProperties);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}
