import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import React from "react";

export const TaskViewSwitcher = () => {
  return (
    <Tabs className="flex-1 w-full border rounded-lg">
      <div className="h-full flex flex-col overflow-hidden p-4">
        <div className="flex flex-col lg:flex-row gap-y-2 items-center justify-between">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calander
            </TabsTrigger>
          </TabsList>
          <Button className="w-full lg:w-auto" size={"sm"}>
            <PlusIcon className="size-4 mr-2" /> New
          </Button>
        </div>
        <DottedSeperator className="my-4" />
        Data filters
        <DottedSeperator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data Kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data Calandar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
