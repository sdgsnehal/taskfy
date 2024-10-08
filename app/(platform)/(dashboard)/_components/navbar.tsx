import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopOver } from "@/components/form/form-popover";

const Navbar = () => {
  return (
    <nav className="fixed z-50 h-14 px-4 shadow-sm bg-white flex items-center w-full border-b">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className=" hidden md:flex">
          <Logo />
        </div>
        <FormPopOver align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            variant="primary"
          >
            Create
          </Button>
        </FormPopOver>
        <FormPopOver>
          <Button
            size="sm"
            className="rounded-sm hidden md:hidden sm:block h-auto py-1.5 px-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopOver>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
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
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
