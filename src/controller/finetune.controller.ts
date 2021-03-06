import { Request, Response } from "express";
import {
  CreateFinetuneInput,
  ReadFinetuneInput,
  ListFinetuneInput,
  UpdateFinetuneInput,
} from "../schema/finetune.schema";
import {
  createFinetune,
  deleteFinetune,
  findAndUpdateFinetune,
  findFinetune,
  listFinetune,
} from "../service/finetune.service";

export async function createFinetuneHandler(
  req: Request<{}, {}, CreateFinetuneInput["body"]>,
  res: Response
) {

  const body = req.body;
  const storyIds = body.storyIds;
  const storyTags = body.storyTags;
  const baseModelId = body.baseModelId;
  const tokenizerName = (body.tokenizerName && body.tokenizerName?.length > 0) ? body.tokenizerName: undefined;
  const learningRate = (body.learningRate && body.learningRate?.length > 0) ? body.learningRate: undefined;
  const state = 'created'
  const finetune = await createFinetune({ baseModelId, storyIds, storyTags, state, tokenizerName, learningRate });
  return res.send({ baseModelId: finetune.baseModelId, state: finetune.state, storyIds: finetune.storyIds, storyTags: finetune.storyTags, finetuneId: finetune.finetuneId, tokenizerName: finetune.tokenizerName, learningRate: finetune.learningRate ,createdAt: finetune.createdAt, updatedAt: finetune.updatedAt });
}

export async function updateFinetuneHandler(
  req: Request<UpdateFinetuneInput["params"]>,
  res: Response
) {
  const finetuneId = req.params.finetuneId;
  const state = req.body.state;

  const finetune = await findFinetune({ finetuneId });

  if (!finetune) {
    return res.sendStatus(404);
  }

  const updatedFinetune = await findAndUpdateFinetune({ finetuneId }, { state }, {
    new: true,
  });

  return res.send(updatedFinetune);
}

export async function getFinetuneHandler(
  req: Request,
  res: Response
) {
  const finetuneId = req.params.finetuneId;
  const finetune = await findFinetune({ finetuneId });

  if (!finetune) {
    return res.sendStatus(404);
  }

  return res.send(finetune);
}


export async function listFinetuneHandler(
  req: Request,
  res: Response
) {
  const state = req.query.state?.toString();
  const skip = parseInt(req.query.skip?.toString() || '0');
  const limit = parseInt(req.query.limit?.toString() || '1000');
  const finetunes = (state && state.length > 0) ? (await listFinetune( { state }, { skip,limit,sort:'createdAt' } )): (await listFinetune({},{ skip,limit,sort:'createdAt' }));
  if (!finetunes) {
    return res.sendStatus(404);
  }

  return res.send(finetunes);
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
