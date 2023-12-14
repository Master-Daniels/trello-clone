import { auth } from "@clerk/nextjs";
import { db } from "./db";

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const checkSubscription = async () => {
    const { orgId } = auth();
    if (!orgId) return false;

    const orgSubscription = await db.orgSubscription.findUnique({
        where: {
            orgId,
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true,
        },
    });
    if (!orgSubscription) return false;
    // If the subscription has ended (i.e., `stripeCurrentPeriodEnd` is in the past), we delete it and
    // return `false`.
    const isValid =
        orgSubscription?.stripePriceId &&
        orgSubscription.stripeCurrentPeriodEnd &&
        orgSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MILLISECONDS > Date.now();

    return !!isValid;
};

export { checkSubscription };
