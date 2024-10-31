import { getCurrent } from "@/features/auth/actions";
import { getWorkSpace } from "@/features/workspaces/actions";
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
    <div>
      <EditWorkSpaceForm initivalValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
