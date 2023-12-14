"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
    id: string;
}
const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onSuccess(data) {
            toast.success(`Board '${data.title} deleted!'`);
        },
        onError(error) {
            toast.error(error);
        },
    });

    const OnDelete = () => {
        execute({ id });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-3 pb-0" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4 border-b-[2px]">
                    Board Actions
                </div>
                <PopoverClose>
                    <Button className="h-auto w-auto absolute top-[0.4rem] p-2 right-2" variant="ghost">
                        <XIcon className="h-4 w-4 text-black" />
                    </Button>
                </PopoverClose>
                <Button
                    type="button"
                    onClick={OnDelete}
                    disabled={isLoading}
                    className="rounded-none w-full h-full py-3 px-5 justify-start font-normal text-sm hover:text-rose-700"
                    variant="ghost"
                >
                    Delete board
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export { BoardOptions };
