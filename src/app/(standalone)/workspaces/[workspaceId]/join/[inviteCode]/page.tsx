import { getCurrent } from "@/features/auth/queries";
import { JoinWorkSpaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkSpaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import React from "react";

type props = {
  params: {
    workspaceId: string;
  };
};
const WorkspaceIdJoinPage = async ({ params }: props) => {
  const user = await getCurrent();

  if (!user) redirect("sign-in");

  const inititalValues = await getWorkSpaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!inititalValues) redirect("/");

  return (
    <div>
      <JoinWorkSpaceForm inititalValues={inititalValues} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
