"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const ProModal = () => {
    const { isOpen, onClose } = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess(data) {
            window.location.href = data;
        },
        onError(error) {
            toast.error(error);
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image src="/images/hero.svg" alt="hero banner" className="object-cover" fill />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <div>
                        <h2 className="font-semibold text-xl py-0.5">Upgrade to Taskify Pro Today</h2>
                        <p className="font-semibold text-[14px] text-neutral-600 pl-1">
                            explore the best of Taskify...
                        </p>
                    </div>
                    <div className="pl-3">
                        <ul className="text-sm list-disc space-y-2">
                            <li>Unlimited boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security features </li>
                            <li>and more!!!</li>
                        </ul>
                    </div>
                    <Button className="w-full" variant="primary" onClick={() => execute({})} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2Icon className="h-6 w-6 text-lg animate-spin" />
                            </>
                        ) : (
                            "Upgrade"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { ProModal };
