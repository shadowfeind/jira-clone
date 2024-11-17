import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useDeleteTask } from "../api/use-delete-tas";
import { useConfirm } from "@/hooks/use-Confirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { useEditTaskModal } from "../hooks/use-edit-task-moda";

type Props = {
  id: string;
  projectId: string;
  children: React.ReactNode;
};

export const TaskActions = ({ id, projectId, children }: Props) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useDeleteTask();
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Task",
    "This action cannot be undone",
    "destructive"
  );

  const { open } = useEditTaskModal();

  const handleDelete = async () => {
    console.log("working");
    const ok = await confirmDelete();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const onOpenTask = () =>
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  const onOpenProject = () =>
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);

  return (
    <div className="flex justify-end">
      <DeleteDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onOpenTask}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4" />
            <span>View Task</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4" />
            <span>Edit Task</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4" />
            <span>Open Project</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 p-[10px]"
          >
            <TrashIcon className="size-4" />
            <span>Delete Task</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
