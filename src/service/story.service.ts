import { FilterQuery, QueryOptions } from "mongoose";
import StoryModel, { StoryDocument, StoryInput } from "../models/story.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createStory(input: StoryInput) {
  try {
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
    const result = await StoryModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}
