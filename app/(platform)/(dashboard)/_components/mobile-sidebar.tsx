"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMobileSider } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import useWindowDimensions from "@/hooks/use-window-dimesions";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onOpen, onClose } = useMobileSider();
    const pathname = usePathname();

    const { width } = useWindowDimensions();
    const DESKTOP_WIDTH = 768;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    useEffect(() => {
        if (width >= DESKTOP_WIDTH) {
            return onClose();
        } else {
            return;
        }
    }, [width, onClose]);

    if (!isMounted) return null;
    return (
        <>
            <Button onClick={onOpen} size="sm" variant="ghost" className="block md:hidden">
                <Menu className="w-4 h-4 sm:h-6 sm:w-6" />
            </Button>

            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="p-2 pt-10 max-w-[15rem]" side="left">
                    <Sidebar storageKey="t-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    );
};
export { MobileSidebar };
