"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListsOptions } from "./list-options";

interface ListHeaderProps {
    data: List;
    onAddCard(): void;
}
const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const { execute, fieldErrors } = useAction(updateList, {
        onSuccess(data) {
            toast.success(`Renamed to '${data.title}'`);
            setTitle(data.title);
            disableEditing();
        },
        onError(error) {
            toast.error(error);
        },
    });

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef?.current?.focus();
            inputRef?.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef?.current?.requestSubmit();
        }
    };

    const onSubmit = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        const formTitle = formData.get("title") as string;
        if (title === formTitle) {
            return disableEditing();
        }

        execute({ title: formTitle, id, boardId });
    };

    useEventListener("keydown", onKeyDown);
    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
                    <input type="hidden" name="id" id="id" value={data.id} />
                    <input type="hidden" name="boardId" id="boardId" value={data.boardId} />
                    <FormInput
                        ref={inputRef}
                        onBlur={() => {
                            formRef?.current?.requestSubmit();
                        }}
                        id="title"
                        placeholder="enter list title"
                        defaultValue={title}
                        className="px-[7px] py-1 text-sm font-medium h-7 border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                        errors={fieldErrors}
                    />
                </form>
            ) : (
                <div onClick={enableEditing} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                    {data.title}
                </div>
            )}
            <ListsOptions data={data} onAddCard={onAddCard} />
        </div>
    );
};

export { ListHeader };
