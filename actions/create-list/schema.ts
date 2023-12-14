import { z } from "zod";

export const CreateList = z.object({
    boardId: z.string(),
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        })
        .min(1, {
            message: "list title cannot be empty",
        }),
});
