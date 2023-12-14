import { z } from "zod";

export const CreateCard = z.object({
    boardId: z.string(),
    listId: z.string(),
    description: z.string().optional(),
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        })
        .min(3, {
            message: "card title should be more than 3 characters",
        }),
});
