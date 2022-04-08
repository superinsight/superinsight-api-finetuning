import { Express, Request, Response } from "express";
import { createStoryHandler, getStoryHandler } from "./controller/story.controller";
import {
  createFinetuneHandler,
  getFinetuneHandler,
  updateFinetuneHandler,
  deleteFinetuneHandler,
} from "./controller/finetune.controller";
import validateResource from "./middleware/validateResource";
import { createStorySchema, getStorySchema } from "./schema/story.schema";
import {
  createFinetuneSchema,
  deleteFinetuneSchema,
  getFinetuneSchema,
  updateFinetuneSchema,
} from "./schema/finetune.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/stories':
   *  post:
   *     tags:
   *     - Story
   *     summary: Create a story
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateStoryInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateStoryResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/stories", validateResource(createStorySchema), createStoryHandler);

    /**
   * @openapi
   * '/api/stories/{storyId}':
   *  get:
   *     tags:
   *     - Story
   *     summary: Get a single story by the storyId
   *     parameters:
   *      - name: storyId
   *        in: path
   *        description: The id of the story
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/ReadStoryResponse'
   *       404:
   *         description: Finetune not found
   */
    app.get(
    "/api/stories/:storyId",
    validateResource(getStorySchema),
    getStoryHandler
  );

  /**
   * @openapi
   * '/api/finetunes':
   *  post:
   *     tags:
   *     - Finetunes
   *     summary: Create a finetune
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateFinetuneInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateFinetuneResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/finetunes",
    [validateResource(createFinetuneSchema)],
    createFinetuneHandler
  );
 
  app.put(
    "/api/finetunes/:finetuneId",
    [validateResource(updateFinetuneSchema)],
    updateFinetuneHandler
  );

  /**
   * @openapi
   * '/api/finetunes/{finetuneId}':
   *  get:
   *     tags:
   *     - Finetunes
   *     summary: Get a single finetune by the finetuneId
   *     parameters:
   *      - name: finetuneId
   *        in: path
   *        description: The id of the finetune
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/ReadFinetuneResponse'
   *       404:
   *         description: Finetune not found
   */
  app.get(
    "/api/finetunes/:finetuneId",
    validateResource(getFinetuneSchema),
    getFinetuneHandler
  );

  app.delete(
    "/api/finetunes/:finetuneId",
    [validateResource(deleteFinetuneSchema)],
    deleteFinetuneHandler
  );

}

export default routes;
