import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export async function getWorkSpaces() {
  try {
    const { databases, account } = await createSessionClient();
    const currentUser = await account.get();
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", currentUser.$id),
    ]);

    if (members.total === 0) return { documents: [], total: 0 };

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return workspaces;
  } catch (error) {
    console.log("getWorkSpaces", error);
    return { documents: [], total: 0 };
  }
}

type GetWorkspaceProps = {
  workspaceId: string;
};

export async function getWorkSpace({ workspaceId }: GetWorkspaceProps) {
  const { databases, account } = await createSessionClient();
  const currentUser = await account.get();

  const member = await getMember({
    databases,
    userId: currentUser.$id,
    workspaceId,
  });

  if (!member) throw new Error("Unauthorized");

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACE_ID,
    workspaceId
  );

  return workspace;
}

type GetWorkspaceInfoProps = {
  workspaceId: string;
};

export async function getWorkSpaceInfo({ workspaceId }: GetWorkspaceInfoProps) {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACE_ID,
    workspaceId
  );

  return { name: workspace.name };
}
