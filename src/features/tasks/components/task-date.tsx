import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

type Props = {
  value: string;
  className?: string;
};

export const TaskDate = ({ value, className }: Props) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = Math.floor(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let textColor = "text-muted-foreground";
  if (diffInDays <= 3) {
    textColor = "text-red-500";
  } else if (diffInDays <= 7) {
    textColor = "text-orange-500";
  } else if (diffInDays <= 14) {
    textColor = "text-yellow-500";
  }
  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </div>
  );
};
