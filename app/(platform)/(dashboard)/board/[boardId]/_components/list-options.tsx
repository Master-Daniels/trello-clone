import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List;
    onAddCard(): void;
}

const ListsOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess(data) {
            toast.success(`List '${data.title}' deleted!`);
            closeRef?.current?.click();
        },
        onError(error) {
            toast.error(error);
        },
    });
    const { execute: executeCopy } = useAction(copyList, {
        onSuccess(data) {
            toast.success(`List '${data.title}' copied!`);
            closeRef?.current?.click();
        },
        onError(error) {
            toast.error(error);
        },
    });
    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        executeDelete({ id, boardId });
    };
    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        executeCopy({ id, boardId });
    };
    return (
        <Popover>
            <PopoverTrigger className="h-auto w-auto px-2 pt-1.5 hover:scale-110 transition">
                <MoreHorizontalIcon className="w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent className="py-3 px-0" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">List options</div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto w-auto p-2 absolute top-1.5 right-2 text-neutral-600" variant="ghost">
                        <XIcon className="h-5 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                    Add a card...
                </Button>
                <form action={onCopy} method="post">
                    <input type="hidden" id="id" name="id" value={data.id} />
                    <input type="hidden" id="boardId" name="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        copy list
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete} method="post">
                    <input type="hidden" id="id" name="id" value={data.id} />
                    <input type="hidden" id="boardId" name="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-rose-700"
                    >
                        Delete list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export { ListsOptions };
