import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  className?: string;
  fallbackClassName?: string;
};

export const MembersAvatar = ({
  fallbackClassName,
  name,
  className,
}: Props) => {
  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
