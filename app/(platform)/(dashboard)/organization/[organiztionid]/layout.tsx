import { Divide } from "lucide-react";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <OrgControl/>
    {children}</div>;
};
export default OrganizationIdLayout;
