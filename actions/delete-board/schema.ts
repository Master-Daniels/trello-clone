import { z } from "zod";

export const DeleteteBoard = z.object({
    id: z.string(),
});
