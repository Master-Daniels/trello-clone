"use server";

import { ReturnType, InputType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteteBoard } from "./schema";
import { redirect } from "next/navigation";
import { ACTION, Board, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/audit-log";
import { decrementAvailableBoardsCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }
    const isPro = await checkSubscription();
    const { id } = data;
    let board: Board;
    try {
        board = await db.board.delete({
            where: { id, orgId },
        });
        if (!isPro) await decrementAvailableBoardsCount();
        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.UPDATE,
        });
    } catch (error) {
        return {
            error: "Failed to delete board",
        };
    }
    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteteBoard, handler);
