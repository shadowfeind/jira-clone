import { getCurrent } from "@/features/auth/queries";
import { CreateWorkSpaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";
import React from "react";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkSpaceForm />
    </div>
  );
};

export default WorkspaceCreatePage;
