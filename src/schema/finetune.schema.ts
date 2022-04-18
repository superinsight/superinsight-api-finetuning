import { object, number, string, array, TypeOf, nullable, optional } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *    CreateFinetuneInput:
 *      type: object
 *      required:
 *        - baseModelId
 *        - storyIds
 *      properties:
 *        baseModelId:
 *          type: string
 *          default: 'gpt-neo-125m'
 *        storyIds:
 *          type: array
 *          items:
 *            type: string
 *          default: ['123','456'] 
 *        storyTags:
 *          type: array
 *          items:
 *            type: string
 *          default: ['medicine','health']
 *        tokenizerName:
 *          type: string
 *          default: ''
 *        learningRate:
 *          type: string
 *          default: ''
 *    CreateFinetuneResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    ReadFinetuneResponse:
 *      type: object
 *      required:
 *        - baseModelId
 *        - storyIds
 *        - storyTags
 *        - state
 *      properties:
 *        baseModelId:
 *          type: string
 *        finetuneId:
 *          type: string
 *        state:
 *          type: string
 *        storyIds:
 *          type: array
 *          items:
 *            type: string
 *        storyTags:
 *          type: array
 *          items:
 *            type: string
 *        tokenizerName:
 *          type: string
 *        learningRate:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    ListFinetuneResponse:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/ReadFinetuneResponse'
 *    UpdateFinetuneInput:
 *      type: object
 *      required:
 *        - state
 *      properties:
 *        state:
 *          type: string
 *          default: 'cancelled'
 *    UpdateFinetuneResponse:
 *      type: object
 *      required:
 *        - baseModelId
 *        - storyIds
 *        - state
 *      properties:
 *        baseModelId:
 *          type: string
 *        finetuneId:
 *          type: string
 *        state:
 *          type: string
 *        storyIds:
 *          type: array
 *          items:
 *            type: string
 *        storyTags:
 *          type: array
 *          items:
 *            type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const payload = {
  body: object({
    baseModelId: string({required_error:'baseModelId required'}),
    storyIds: array(string({required_error:'story ids required'})),
    storyTags: array(string()),
    tokenizerName: optional(string()),
    learningRate: optional(string()),
  }),
};

const params = {
  params: object({
    finetuneId: string({
      required_error: "finetuneId is required",
    }),
  }),
};

export const createFinetuneSchema = object({
  ...payload,
});

export const updateFinetuneSchema = object({
  body: object({
    state: string({required_error:'state is required'}),
  }),
  ...params,
});

export const deleteFinetuneSchema = object({
  ...params,
});

export const getFinetuneSchema = object({
  ...params,
});

export const listFinetuneSchema = object({});

export type CreateFinetuneInput = TypeOf<typeof createFinetuneSchema>;
export type UpdateFinetuneInput = TypeOf<typeof updateFinetuneSchema>;
export type ReadFinetuneInput = TypeOf<typeof getFinetuneSchema>;
export type ListFinetuneInput = TypeOf<typeof listFinetuneSchema>;
export type DeleteFinetuneInput = TypeOf<typeof deleteFinetuneSchema>;
