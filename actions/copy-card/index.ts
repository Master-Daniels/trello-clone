"use server";

import { ReturnType, InputType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { createAuditLog } from "@/lib/audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }
    const { id, boardId } = data;
    let card;
    try {
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });
        if (!cardToCopy) {
            return {
                error: "Card not found",
            };
        }
        const lastCard = await db.card.findFirst({
            where: { listId: cardToCopy.listId },
            orderBy: { order: "desc" },
            select: { order: true },
        });
        const newOrder = lastCard ? lastCard.order + 1 : 1;
        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - copy`,
                description: cardToCopy.description,
                listId: cardToCopy.listId,
                order: newOrder,
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
            error: "Failed to copy card",
        };
    }
    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
