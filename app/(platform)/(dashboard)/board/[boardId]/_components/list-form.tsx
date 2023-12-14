"use client";

import { PlusIcon, XIcon } from "lucide-react";
import ListWrapper from "./list-wrapper";
import { useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

const ListForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const params = useParams();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef?.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") disableEditing();
    };

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess(data) {
            toast.success(`List "${data.title}" created!`);
            disableEditing();
            router.refresh();
        },
        onError(error) {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        // handled in action schema(zod)
        // if (!title || !title.trim()) {
        //     return toast.error("List title cannot be empty");
        // }

        execute({ title, boardId });
    };
    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    ref={formRef}
                    action={onSubmit}
                    className="w-full p-3 pt-4 rounded-md bg-white space-y-6 shadow-md"
                >
                    <FormInput
                        ref={inputRef}
                        id="title"
                        className="text-sm px-2 py-1 font-medium border-transparent h-7 hover:border-input focus:border-input transition"
                        placeholder="Enter a title"
                        errors={fieldErrors}
                    />
                    <input type="hidden" name="boardId" value={params.boardId} />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add list</FormSubmit>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <XIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        );
    }

    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
            >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add a list
            </button>
        </ListWrapper>
    );
};

export { ListForm };
