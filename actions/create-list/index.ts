"use server";

import { ReturnType, InputType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }
    const { title, boardId } = data;
    let list;
    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId,
            },
            include: {
                list: {
                    orderBy: [{ order: "desc" }],
                },
            },
        });
        if (!board) {
            return {
                error: "Board not found",
            };
        }

        const lastList = board.list.at(0);
        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                boardId,
                title,
                order: newOrder,
            },
        });

        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
        });
    } catch (error) {
        return {
            error: "Failed to create list",
        };
    }
    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
