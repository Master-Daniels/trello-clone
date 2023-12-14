import { z } from "zod";
import { DeleteteList } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof DeleteteList>;
export type ReturnType = ActionState<InputType, List>;
