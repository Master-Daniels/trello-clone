import { db } from "@/lib/db";
import { startCase } from "@/lib/helpers";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({ params }: { params: { boardId: string } }) {
    const { orgId } = auth();
    if (!orgId) {
        return {
            title: "Board",
        };
    }
    const board = await db.board.findUnique({
        where: { id: params.boardId, orgId },
    });

    return {
        title: startCase(board?.title!) || "Board",
    };
}

const BoardIdLayout = async ({ children, params }: { children: React.ReactNode; params: { boardId: string } }) => {
    const { orgId } = auth();
    if (!orgId) {
        return redirect("/select-org");
    }

    const board = await db.board.findUnique({
        where: { id: params.boardId, orgId },
    });

    if (!board) notFound();

    return (
        <div
            className="relative h-screen bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            <div className="absolute inset-0 bg-black/30" />
            <BoardNavbar data={board} />

            <main className="relative pt-[8rem] h-full">{children}</main>
        </div>
    );
};

export default BoardIdLayout;