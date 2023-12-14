"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

const OrgControl = () => {
    const params: { organizationId: string } = useParams();
    const { setActive } = useOrganizationList();
    useEffect(() => {
        if (!setActive) return;
        setActive({
            organization: params?.organizationId,
        });
    }, [setActive, params?.organizationId]);
    return null;
};

export { OrgControl };
