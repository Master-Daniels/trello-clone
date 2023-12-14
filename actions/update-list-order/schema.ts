import { z } from "zod";

export const UpdateListOrder = z.object({
    items: z.array(
        z.object({
            order: z.number(),
            id: z.string(),
            title: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    ),
    boardId: z.string(),
});
