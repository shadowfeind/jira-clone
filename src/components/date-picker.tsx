"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

type Props = {
  value: Date | undefined;
  onChange: (value: Date) => void;
  className?: string;
  placeholder?: string;
};

const DatePicker = ({
  value,
  onChange,
  className,
  placeholder = "Select date",
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"lg"}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
