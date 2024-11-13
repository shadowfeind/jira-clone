import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "./types";
import { getMember } from "../members/utils";

type GetProjectProps = {
  projectId: string;
};

export async function getProject({ projectId }: GetProjectProps) {
  const { databases, account } = await createSessionClient();
  const currentUser = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: currentUser.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) throw new Error("Unauthorized");

  return project;
}
