import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  image?: string;
  name: string;
  className?: string;
  fallbackClassname?: string;
};

export const ProjectAvatar = ({
  image,
  name,
  className,
  fallbackClassname,
}: Props) => {
  if (image) {
    return (
      <div
        className={cn("size-5 relative rounede-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-500  text-lg uppercase font-semibold rounded-md",
          fallbackClassname
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
