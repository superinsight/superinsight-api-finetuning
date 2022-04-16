import { Request, Response } from "express";
import { CreateStoryInput, ReadStoryInput } from "../schema/story.schema";
import { createStory, findStory, listStory } from "../service/story.service";
import logger from "../utils/logger";

export async function createStoryHandler(
  req: Request<{}, {}, CreateStoryInput["body"]>,
  res: Response
) {
  try {
    const megaByte= (new TextEncoder().encode(req.body.text)).length / (1024 * 1024);
    if (megaByte > 16) return res.status(413).send(`payload must be less than ${megaByte}MB`);
    const story = await createStory(req.body);
    return res.send({ storyId: story.storyId, name: story.name, text: story.text, tags: story.tags });
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


export async function listStoryHandler(
  req: Request,
  res: Response
) {
  const tags = req.query.tags?.toString().split(',');
  const skip = parseInt(req.query.skip?.toString() || '0');
  const limit = parseInt(req.query.limit?.toString() || '1000');
  const storyIds = (tags && tags.length > 0) ? (await listStory( { tags: { '$in': tags } }, { skip,limit,sort:'createdAt' } )): (await listStory({},{ skip,limit,sort:'createdAt' }));
  if (!storyIds) {
    return res.sendStatus(404);
  }

  return res.send(storyIds);
}