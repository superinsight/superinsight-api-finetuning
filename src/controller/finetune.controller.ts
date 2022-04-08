import { Request, Response } from "express";
import {
  CreateFinetuneInput,
  ReadFinetuneInput,
  UpdateFinetuneInput,
} from "../schema/finetune.schema";
import {
  createFinetune,
  deleteFinetune,
  findAndUpdateFinetune,
  findFinetune,
} from "../service/finetune.service";

export async function createFinetuneHandler(
  req: Request<{}, {}, CreateFinetuneInput["body"]>,
  res: Response
) {

  const body = req.body;
  const storyIds = body.storyIds;
  const baseModelId = body.baseModelId;
  const status = 'new'

  const finetune = await createFinetune({ baseModelId, storyIds, status });

  return res.send(finetune);
}

export async function updateFinetuneHandler(
  req: Request<UpdateFinetuneInput["params"]>,
  res: Response
) {
  const finetuneId = req.params.finetuneId;
  const storyIds = req.body.storyIds;
  const baseModelId = req.body.baseModelId;
  const status = req.body.status;

  const finetune = await findFinetune({ finetuneId });

  if (!finetune) {
    return res.sendStatus(404);
  }

  const updatedFinetune = await findAndUpdateFinetune({ finetuneId }, { baseModelId, storyIds, status }, {
    new: true,
  });

  return res.send(updatedFinetune);
}

export async function getFinetuneHandler(
  req: Request<ReadFinetuneInput["params"]>,
  res: Response
) {
  const finetuneId = req.params.finetuneId;
  const finetune = await findFinetune({ finetuneId });

  if (!finetune) {
    return res.sendStatus(404);
  }

  return res.send(finetune);
}

export async function deleteFinetuneHandler(
  req: Request<UpdateFinetuneInput["params"]>,
  res: Response
) {
  const finetuneId = req.params.finetuneId;

  const finetune = await findFinetune({ finetuneId });

  if (!finetune) {
    return res.sendStatus(404);
  }

  await deleteFinetune({ finetuneId });

  return res.sendStatus(200);
}
