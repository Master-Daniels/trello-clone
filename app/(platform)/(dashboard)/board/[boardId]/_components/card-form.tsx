import { createCard } from "@/actions/create-card";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { PlusIcon, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing(): void;
    disableEditing(): void;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
        const params = useParams();
        const formRef = useRef<HTMLFormElement>(null);

        const { execute, fieldErrors } = useAction(createCard, {
            onSuccess(data) {
                toast.success(`card '${data.title}' created!`);
                formRef?.current?.reset();
                disableEditing();
            },
            onError(error) {
                toast.error(error);
            },
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                disableEditing();
            }
        };

        useOnClickOutside(formRef, disableEditing);
        useEventListener("keydown", onKeyDown);

        const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                formRef?.current?.requestSubmit();
            }
        };
        const onSubmit = (formData: FormData) => {
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const listId = formData.get("listId") as string;
            const boardId = params.boardId as string;

            if (!title || !title.trim()) {
                formRef?.current?.reset();
                return toast.error("Card title cannot be empty");
            }

            execute({ title, listId, boardId, description });
        };
        if (isEditing) {
            return (
                <form ref={formRef} action={onSubmit} className="m-1 py-0.5 px-1 space-y-4">
                    <FormInput
                        id="title"
                        placeholder="Card title"
                        errors={fieldErrors}
                        className="!py-3 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-none"
                    />
                    <FormTextarea
                        id="description"
                        onKeyDown={onTextAreaKeyDown}
                        ref={ref}
                        placeholder="Card description (optional)"
                        errors={fieldErrors}
                    />
                    <input type="hidden" name="listId" id="listId" value={listId} />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add Card</FormSubmit>
                        <Button size="sm" variant="ghost" onClick={disableEditing}>
                            <XIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            );
        }
        return (
            <div className="pt-2 px-2">
                <Button
                    onClick={enableEditing}
                    className="h-auto px-2 py-1.5 w-full justify-start text-opacity-75 text-sm"
                    size="sm"
                    variant="ghost"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add a card
                </Button>
            </div>
        );
    }
);

CardForm.displayName = "CardForm";

export { CardForm };
