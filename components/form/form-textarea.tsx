"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[]> | undefined;
    onBlur?(): void;
    onClick?(): void;
    onFocus?(): void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => {
    const { id, label, className, errors, disabled } = props;
    const { pending } = useFormStatus();
    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {label ? (
                    <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
                        {label}
                    </Label>
                ) : null}
                <Textarea
                    {...props}
                    ref={ref}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-none",
                        className
                    )}
                    name={id}
                    disabled={pending || disabled}
                    aria-describedby={`${id} - error`}
                />
            </div>
            <FormErrors id={id} errors={errors} />
        </div>
    );
});
FormTextarea.displayName = "FormTextarea";
export { FormTextarea };
