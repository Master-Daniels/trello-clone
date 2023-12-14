import { z } from "zod";

export const UpdateCard = z.object({
    id: z.string(),
    boardId: z.string(),
    description: z.optional(
        z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description is required",
            })
            .min(3, {
                message: "Description must be 3 character or more",
            })
    ),
    title: z.optional(
        z
            .string({
                required_error: "title is required",
                invalid_type_error: "title must be a string",
            })
            .min(3, {
                message: "mninimum of 3 characters",
            })
    ),
});
