import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { projectId: string };
};

const ProjectIdSettingsPage = async ({ params }: Props) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initivalValues = await getProject({ projectId: params.projectId });

  return (
    <div className="w-full  lg:max-w-xl">
      <EditProjectForm initivalValues={initivalValues} />
    </div>
  );
};

export default ProjectIdSettingsPage;
