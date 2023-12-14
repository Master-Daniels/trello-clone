import { Hint } from "@/components/custom/hint";
import { FormPopover } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/board";
import { db } from "@/lib/db";
import { startCase } from "@/lib/helpers";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import { HelpCircleIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const BoardList = async () => {
    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select-org");
    }

    const boards = await db.board.findMany({
        where: { orgId },
        orderBy: { createdAt: "desc" },
    });

    const currentCount = MAX_FREE_BOARDS - (await getAvailableCount());
    const isPro = await checkSubscription();

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2Icon className="h-6 w-6 mr-2" />
                Your boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board: Board) => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        className="group aspect-video relative bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full p-2 w-full overflow-hidden"
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
                        <p className="relative font-semibold text-white">{startCase(board.title)}</p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-sm">Create a board</p>
                        <span className="text-xs">
                            {isPro ? (
                                "Unlimited boards available"
                            ) : (
                                <>
                                    {currentCount} board{currentCount !== 1 && "s"} remaining
                                </>
                            )}
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`Free workspaces can have up to ${MAX_FREE_BOARDS} open boards. For unlimited boards upgrade this workspace`}
                        >
                            <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};

BoardList.Skeleton = function BoardListSkeletion() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video p-2 w-full h-full" />
            <Skeleton className="aspect-video p-2 w-full h-full" />
            <Skeleton className="aspect-video p-2 w-full h-full" />
            <Skeleton className="aspect-video p-2 w-full h-full" />
            <Skeleton className="aspect-video p-2 w-full h-full" />
            <Skeleton className="aspect-video p-2 w-full h-full" />
            <Skeleton className="aspect-video p-2 w-full h-full" />
        </div>
    );
};

export { BoardList };
