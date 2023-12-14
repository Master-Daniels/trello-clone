import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/logo";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";

const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center px-4">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="rounded-sm hidden md:block h-auto py-1.5 px-2"
                    >
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button type="button" variant="primary" size="sm" className="rounded-sm block md:hidden">
                        <Plus className="h-4 w-4" />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterLeaveOrganizationUrl="/select-org"
                    afterCreateOrganizationUrl="/organization/:id"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        },
                    }}
                />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                weight: 30,
                            },
                        },
                    }}
                />
            </div>
        </nav>
    );
};
export { Navbar };
