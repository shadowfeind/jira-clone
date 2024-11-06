import { getCurrent } from "@/features/auth/queries";
import { getWorkSpace } from "@/features/workspaces/queries";
import { EditWorkSpaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspaceIdSettingsPage = async ({ params }: Props) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkSpace({ workspaceId: params.workspaceId });

  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkSpaceForm initivalValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
