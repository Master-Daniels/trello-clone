import { OrganizationList } from "@clerk/nextjs";

const OrganizationListPage = () => {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"
        />
    );
};

export default OrganizationListPage;
