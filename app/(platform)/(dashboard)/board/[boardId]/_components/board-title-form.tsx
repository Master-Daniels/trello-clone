"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
    data: Board;
}
const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
    const { execute } = useAction(updateBoard, {
        onSuccess(data: Board) {
            toast.success(`Board "${data.title}" updated!`);
            setTitle(data.title);
            disableEditing();
        },
        onError(error) {
            toast.error(error);
        },
    });

    const [title, setTitle] = useState(data.title);
    const [isEdititng, setIsEdititng] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const enableEditing = () => {
        setIsEdititng(true);
        setTimeout(() => {
            inputRef?.current?.focus();
            inputRef?.current?.select();
        });
    };
    const disableEditing = () => setIsEdititng(false);

    const onSubmit = (formData: FormData) => {
        const formTitle = formData.get("title") as string;
        if (!formTitle || !formTitle.trim()) {
            if (inputRef?.current) inputRef.current.value = title;
            return toast.error("board title cannot be empty");
        }
        if (formTitle === title) {
            return toast.error("cannot set same board title");
        }
        execute({ id: data.id, title: formTitle });
    };

    if (isEdititng) {
        return (
            <form action={onSubmit} className="flex items-center gap-x-2" ref={formRef}>
                <FormInput
                    id="title"
                    onBlur={() => {
                        formRef?.current?.requestSubmit();
                    }}
                    defaultValue={title}
                    className="text-lg font-bold px-[17px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                    ref={inputRef}
                />
            </form>
        );
    }
    return (
        <Button variant="transparent" className="font-bold text-lg h-auto w-auto p-1 px-2" onClick={enableEditing}>
            {title}
        </Button>
    );
};

export { BoardTitleForm };
