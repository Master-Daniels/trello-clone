"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
    size?: "default" | "sm" | "lg" | "icon";
}
const FormSubmit = ({ children, disabled, className, variant = "primary", size, ...props }: FormSubmitProps) => {
    const { pending } = useFormStatus();
    return (
        <Button
            disabled={pending || disabled}
            variant={variant}
            size={size || "sm"}
            className={cn(className)}
            {...props}
        >
            {children}
        </Button>
    );
};
export { FormSubmit };
