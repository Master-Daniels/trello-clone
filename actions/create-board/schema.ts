import { z } from "zod";

export const CreateBoard = z.object({
    image: z.string({
        required_error: "an image must be selected",
        invalid_type_error: "an image must be selected",
    }),
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        })
        .min(3, {
            message: "board title must be 3 characters or more",
        }),
});
