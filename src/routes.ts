import { Express, Request, Response } from "express";
import { createStoryHandler, getStoryHandler, listStoryHandler } from "./controller/story.controller";
import {
  createFinetuneHandler,
  getFinetuneHandler,
  listFinetuneHandler,
  updateFinetuneHandler,
  deleteFinetuneHandler,
} from "./controller/finetune.controller";
import validateResource from "./middleware/validateResource";
import { createStorySchema, getStorySchema, listStorySchema} from "./schema/story.schema";
import {
  createFinetuneSchema,
  deleteFinetuneSchema,
  getFinetuneSchema,
  listFinetuneSchema,
  updateFinetuneSchema,
} from "./schema/finetune.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/stories':
   *  post:
   *     tags:
   *     - Story
   *     summary: Create a story that will be use for finetuning, maximum size of a story is 16MB, create multiple stories for finetuning larger amount of data
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
   *     summary: Get a single story by the storyId, a story is use for finetuning a model 
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
   *         description: Story not found
   */
    app.get(
    "/api/stories/:storyId",
    validateResource(getStorySchema),
    getStoryHandler
  );

  /**
   * @openapi
   * '/api/stories':
   *  get:
   *     tags:
   *     - Story
   *     summary: List stories by tags, useful for listing all story tags
   *     parameters:
   *      - name: tags 
   *        in: query
   *        description: List of stories comma delimiter 
   *        required: false
   *      - name: skip 
   *        in: query
   *        description: skiping the number of elements from all the possible results 
   *        required: false
   *      - name: limit 
   *        in: query
   *        description: limiting the number of return results
   *        required: false
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/ListStoryResponse'
   *       404:
   *         description: Stories not found
   */
   app.get(
    "/api/stories/",
    validateResource(listStorySchema),
    listStoryHandler
  );

  /**
   * @openapi
   * '/api/finetunes':
   *  post:
   *     tags:
   *     - Finetunes
   *     summary: Create a finetune with stories by including all the story ids and story tags
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

  /**
   * @openapi
   * '/api/finetunes/{finetuneId}':
   *  put:
   *     tags:
   *     - Finetunes
   *     summary: Update the state of the finetune, state includes created, cancelled, training, failed, completed, uploaded
   *     parameters:
   *      - name: finetuneId
   *        in: path
   *        description: The id of the finetune that needs to be updated
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateFinetuneInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UpdateFinetuneResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
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
   *     summary: Get information about the finetune by passing the finetuneId
   *     parameters:
   *      - name: finetuneId
   *        in: path
   *        description: finetune ID
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


  /**
   * @openapi
   * '/api/finetunes':
   *  get:
   *     tags:
   *     - Finetunes
   *     summary: List finetunes by state, useful for viewing all finetunes
   *     parameters:
   *      - name: state 
   *        in: query
   *        description: The state of the finetunes to query on
   *        required: false
   *      - name: skip 
   *        in: query
   *        description: skiping the number of elements from all the possible results 
   *        required: false
   *      - name: limit 
   *        in: query
   *        description: limiting the number of return results
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/ListFinetuneResponse'
   *       404:
   *         description: Finetune not found
   */
   app.get(
    "/api/finetunes/",
    validateResource(listFinetuneSchema),
    listFinetuneHandler
  );

}

export default routes;
