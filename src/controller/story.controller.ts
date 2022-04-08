import { Request, Response } from "express";
import { CreateStoryInput, ReadStoryInput } from "../schema/story.schema";
import { createStory, findStory } from "../service/story.service";
import logger from "../utils/logger";

export async function createStoryHandler(
  req: Request<{}, {}, CreateStoryInput["body"]>,
  res: Response
) {
  try {
    const story = await createStory(req.body);
    return res.send(story);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getStoryHandler(
  req: Request<ReadStoryInput["params"]>,
  res: Response
) {
  const storyId = req.params.storyId;
  const story = await findStory({ storyId });

  if (!story) {
    return res.sendStatus(404);
  }

  return res.send(story);
}