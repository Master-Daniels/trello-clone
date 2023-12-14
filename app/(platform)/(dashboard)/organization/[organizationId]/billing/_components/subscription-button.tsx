"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionButtonProps {
    isPro: boolean;
    className: string;
}
const SubscriptionButton = ({ isPro, className }: SubscriptionButtonProps) => {
    const proModal = useProModal();
    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error);
        },
    });
    const onClick = () => {
        if (!isPro) {
            return proModal.onOpen();
        }
        // If user already has a subscription open the checkout session for updating it
        execute({});
    };
    return (
        <Button disabled={isLoading} onClick={onClick} variant="primary" className={cn("w-1/4", className)}>
            {isLoading ? (
                <Loader2Icon className="w-6 h-6 animate-spin" />
            ) : (
                <>{isPro ? "Manage Subscription" : "Go Pro!"}</>
            )}
        </Button>
    );
};

export default SubscriptionButton;
