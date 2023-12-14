import { z } from "zod";

export const DeleteteList = z.object({
    id: z.string(),
    boardId: z.string(),
});
