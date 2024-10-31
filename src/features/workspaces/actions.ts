import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { AUTH_COOKIE } from "../auth/constant";
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";

export async function getWorkSpaces() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get(AUTH_COOKIE);

    if (!session) return { documents: [], total: null };

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
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
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
    const currentUser = await account.get();

    const member = await getMember({
      databases,
      userId: currentUser.$id,
      workspaceId,
    });

    if (!member) return null;

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );

    return workspace;
  } catch (error) {
    console.log("getWorkSpace", error);
    return { documents: [], total: 0 };
  }
}
