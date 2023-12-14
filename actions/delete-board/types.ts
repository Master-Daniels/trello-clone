import { z } from "zod";
import { DeleteteBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof DeleteteBoard>;
export type ReturnType = ActionState<InputType, Board>;
