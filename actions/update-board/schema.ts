import { z } from "zod";

export const UpdateBoard = z.object({
    id: z.string(),
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        })
        .min(3, {
            message: "mninimum of 3 characters",
        }),
});
