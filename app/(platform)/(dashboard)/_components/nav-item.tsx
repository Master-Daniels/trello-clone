"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string;
};

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
}
const NavItem = ({ isExpanded, isActive, organization, onExpand }: NavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`,
        },
        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: "settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`,
        },
    ];

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <AccordionItem value={organization.id} className="border-none">
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            fill
                            sizes="100vw"
                            src={organization.imageUrl}
                            alt="organization"
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="font-medium text-sm">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        size="sm"
                        onClick={() => onClick(route.href)}
                        variant="ghost"
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1 border",
                            pathname === route.href && "bg-sky-500/10 text-sky-700"
                        )}
                    >
                        {route.icon} {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

function NavItemSkeleton() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 shrink-0">
                <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export { NavItem, NavItemSkeleton };
