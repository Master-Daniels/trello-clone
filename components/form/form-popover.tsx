"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "end" | "center";
    sideOffset?: number;
}
const FormPopover = ({ children, side = "top", sideOffset = 0, align = "center" }: FormPopoverProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const router = useRouter();

    const proModal = useProModal();

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            formRef?.current?.reset();
            toast.success(`Board '${data.title}' created!`);
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (error) => {
            toast.error(error);
            proModal.onOpen();
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        execute({ title, image });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
                <div className="text-sm font-medium text-center-text-neutral-600 pb-4 uppercase">Create board</div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} ref={formRef}>
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors} />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            placeholder="your board title"
                            errors={fieldErrors}
                        />
                        <FormSubmit className="w-full">Create</FormSubmit>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};
export { FormPopover };
