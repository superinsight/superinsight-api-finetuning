import { object, number, string, array, TypeOf } from "zod";

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
 *       - baseModelId
 *       - storyIds
 *      properties:
 *        baseModelId:
 *          type: string
 *        storyIds:
 *          type: array
 *          items: 
 *            type: string
 */


const payload = {
  body: object({
    baseModelId: string({required_error:'baseModelId required'}),
    storyIds: array(string({required_error:'story ids required'})),
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
  ...payload,
  ...params,
});

export const deleteFinetuneSchema = object({
  ...params,
});

export const getFinetuneSchema = object({
  ...params,
});

export type CreateFinetuneInput = TypeOf<typeof createFinetuneSchema>;
export type UpdateFinetuneInput = TypeOf<typeof updateFinetuneSchema>;
export type ReadFinetuneInput = TypeOf<typeof getFinetuneSchema>;
export type DeleteFinetuneInput = TypeOf<typeof deleteFinetuneSchema>;
