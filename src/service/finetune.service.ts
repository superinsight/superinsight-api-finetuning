import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FinetuneModel, {
  FinetuneDocument,
  FinetuneInput,
} from "../models/finetune.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";
const returnProperties = 'baseModelId finetuneId state storyIds storyTags createdAt updatedAt -_id';
export async function createFinetune(input: FinetuneInput) {
  const metricsLabels = {
    operation: "createFinetune",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FinetuneModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findFinetune(
  query: FilterQuery<FinetuneDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findFinetune",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FinetuneModel.findOne(query, {}, options).select(returnProperties);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateFinetune(
  query: FilterQuery<FinetuneDocument>,
  update: UpdateQuery<FinetuneDocument>,
  options: QueryOptions
) {
  return FinetuneModel.findOneAndUpdate(query, update, options);
}

export async function deleteFinetune(query: FilterQuery<FinetuneDocument>) {
  return FinetuneModel.deleteOne(query);
}

export async function listFinetune(
  query: FilterQuery<FinetuneDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "listFinetune",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FinetuneModel.find(query, {}, options).select(returnProperties);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}