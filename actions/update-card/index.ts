"use server";

import { ReturnType, InputType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
import { createAuditLog } from "@/lib/audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }
    const { id, boardId, ...rest } = data;
    let card;
    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            data: {
                ...rest,
            },
        });
        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE,
        });
    } catch (error) {
        return {
            error: "Failed to update",
        };
    }
    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
