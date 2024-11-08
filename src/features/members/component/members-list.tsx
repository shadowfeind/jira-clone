"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspaceId";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { DottedSeperator } from "@/components/dotted-seperator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Fragment } from "react";
import { MembersAvatar } from "./members-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "../api/use-delete-member";
import { useUpdateMember } from "../api/use-update-member";
import { MemberRoles } from "../types";
import { useConfirm } from "@/hooks/use-Confirm";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const [ConfimDialog, confirm] = useConfirm(
    "Remove Member",
    "This member will be removed from the workspace",
    "destructive"
  );
  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletePending } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatePending } =
    useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRoles) => {
    updateMember({ json: { role }, param: { memberId } });
  };

  const handleDeleteMeber = async (memberId: string) => {
    const ok = await confirm();

    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => window.location.reload(),
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfimDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-7-0">
        <Button variant={"secondary"} size={"sm"} asChild>
          <Link href={`/workspace/${workspaceId}`}>
            <ArrowLeftIcon className="size-4 mr-2" />
            back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MembersAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="ml-auto "
                    variant={"secondary"}
                    size={"icon"}
                  >
                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    disabled={isUpdatePending}
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRoles.MEMBER)
                    }
                  >
                    Set as member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    disabled={isUpdatePending}
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRoles.ADMIN)
                    }
                  >
                    Set as administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    disabled={isDeletePending}
                    onClick={() => handleDeleteMeber(member.$id)}
                  >
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
