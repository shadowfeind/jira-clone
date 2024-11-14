import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { Loader } from "lucide-react";
import React from "react";
import { CreateTaskForm } from "./create-task-form";

type Props = {
  onCancel: () => void;
};

export const CreateTaskFormWrapper = ({ onCancel }: Props) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: projectLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));
  const membersOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));
  const isloadin = projectLoading || membersLoading;

  if (isloadin) {
    return (
      <Card className="w-full h=[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <CreateTaskForm
        onCanel={onCancel}
        projectOptions={projectOptions ?? []}
        membersOptions={membersOptions ?? []}
      />
    </div>
  );
};
