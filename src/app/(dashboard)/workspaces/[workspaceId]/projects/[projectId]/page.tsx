import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { getProject } from "@/features/projects/queries";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { projectId: string };
};

const ProjectIdPage = async ({ params }: Props) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initalValues = await getProject({
    projectId: params.projectId,
  });

  if (!initalValues) throw new Error("Project not found");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initalValues.name}
            image={initalValues.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initalValues.name}</p>
        </div>
        <div>
          <Button variant="secondary" size={"sm"} asChild>
            <Link
              href={`/workspaces/${initalValues.workspaceId}/projects/${initalValues.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdPage;
