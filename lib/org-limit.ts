import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { MAX_FREE_BOARDS } from "@/constants/board";

export const incrementAvailableBoardsCount = async () => {
    const { orgId } = auth();
    if (!orgId) {
        throw new Error("Unauthorized");
    }
    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId },
    });
    if (!orgLimit) {
        await db.orgLimit.create({
            data: {
                orgId,
                count: 1,
            },
        });
    } else {
        await db.orgLimit.update({
            where: { orgId },
            data: {
                count: orgLimit?.count + 1,
            },
        });
    }
};
export const decrementAvailableBoardsCount = async () => {
    const { orgId } = auth();
    if (!orgId) {
        throw new Error("Unauthorized");
    }
    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId },
    });
    if (!orgLimit) {
        throw new Error("Cannot delete board");
    } else {
        await db.orgLimit.update({
            where: { orgId },
            data: {
                count: orgLimit?.count > 0 ? orgLimit?.count - 1 : 0,
            },
        });
    }
};

export const hasAvailableCount = async () => {
    const { orgId } = auth();
    if (!orgId) {
        throw new Error("Unauthorized");
    }
    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId },
    });

    if (orgLimit && orgLimit.count >= MAX_FREE_BOARDS) {
        return false;
    }
    return true;
};

export const getAvailableCount = async () => {
    const { orgId } = auth();
    if (!orgId) {
        return 0;
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: { orgId },
    });

    if (!orgLimit) {
        return 0;
    }
    return orgLimit.count;
};
