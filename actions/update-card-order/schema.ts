import { z } from "zod";

export const UpdateCardOrder = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            order: z.number(),
            description: z.string().nullable(),
            listId: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    ),
    boardId: z.string(),
});
