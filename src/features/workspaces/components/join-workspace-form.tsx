"use client";

import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspaceId";
import { useRouter } from "next/router";

type Props = {
  inititalValues: {
    name: string;
  };
};

export const JoinWorkSpaceForm = ({ inititalValues }: Props) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate } = useJoinWorkspace();
  const router = useRouter();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => router.push(`/workspaces/${data.$id}`),
      }
    );
  };
  return (
    <Card className="w-fll h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join {inititalValues.name}
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <Button className="w-full lg:w-fit" size={"lg"} type="button" asChild>
            <Link href="/">cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            size={"lg"}
            type="button"
            onClick={onSubmit}
          >
            join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
