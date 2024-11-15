import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";
import React from "react";
import { TaskStatus } from "../types";
import { useTasksFilter } from "../hooks/use-tasks-filter";
import DatePicker from "@/components/date-picker";

type Props = {
  hideProjectFileter?: boolean;
};

export const DataFilters = ({ hideProjectFileter }: Props) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: projectLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  const isLoading = projectLoading || membersLoading;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));
  const membersOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, projectId, assigneeId, dueDate }, setFilters] =
    useTasksFilter();

  const onStatusChange = (value: string) => {
    setFilters({
      status: value === "all" ? undefined : (value as TaskStatus),
    });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({
      assigneeId: value === "all" ? undefined : (value as TaskStatus),
    });
  };

  const onProjectChange = (value: string) => {
    setFilters({
      projectId: value === "all" ? undefined : (value as TaskStatus),
    });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-fill lg:w-auto h-8">
          <div className="flex items-center p-2">
            <ListCheckIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Status" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-fill lg:w-auto h-8">
          <div className="flex items-center p-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Assignee" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          <SelectSeparator />
          {membersOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={(value) => onProjectChange(value)}
      >
        <SelectTrigger className="w-fill lg:w-auto h-8">
          <div className="flex items-center p-2">
            <FolderIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Projects" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          <SelectSeparator />
          {projectOptions?.map((project) => (
            <SelectItem key={project.value} value={project.value}>
              {project.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePicker
        placeholder="due date"
        className="h-8 w-fill lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) =>
          setFilters({
            dueDate: date ? date.toISOString() : undefined,
          })
        }
      />
    </div>
  );
};
