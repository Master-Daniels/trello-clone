"use client";

import Link from "next/link";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, NavItemSkeleton, Organization } from "./nav-item";

interface SidebarProps {
    storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<{ [key: string]: any }>(storageKey, {});
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
        if (expanded[key]) {
            acc.push(key);
        }
        return acc;
    }, []);

    const onExpand = (id: string) => {
        setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
    };

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between">
                    <Skeleton className="w-[50%] h-10" />
                    <Skeleton className="w-10 h-10" />
                </div>
                <div className="space-y-2 mt-5">
                    <NavItemSkeleton />
                    <NavItemSkeleton />
                    <NavItemSkeleton />
                    <NavItemSkeleton />
                    <NavItemSkeleton />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">Workspaces</span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships?.data?.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={() => onExpand(organization.id)}
                    />
                ))}
            </Accordion>
        </>
    );
};

export { Sidebar };
