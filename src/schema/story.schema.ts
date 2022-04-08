import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    ReadStoryResponse:
 *      type: object
 *      required:
 *       - storyId
 *       - name
 *       - text
 *      properties:
 *        name:
 *          type: string
 *        text:
 *          type: string
 *    CreateStoryInput:
 *      type: object
 *      required:
 *        - text
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          default: Lorem Ipsum
 *        text:
 *          type: string
 *          default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 
 *    CreateStoryResponse:
 *      type: object
 *      properties:
 *        text:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createStorySchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    text: string({
      required_error: "Text is required",
    }),
  })
});

const params = {
  params: object({
    storyId: string({
      required_error: "storyId is required",
    }),
  }),
};

export const getStorySchema = object({
  ...params,
});

export type CreateStoryInput = TypeOf<typeof createStorySchema>;
export type ReadStoryInput = TypeOf<typeof getStorySchema>;