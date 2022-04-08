import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FinetuneModel, {
  FinetuneDocument,
  FinetuneInput,
} from "../models/finetune.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

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
    const result = await FinetuneModel.findOne(query, {}, options);
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
