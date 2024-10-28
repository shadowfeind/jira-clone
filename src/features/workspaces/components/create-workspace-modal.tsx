"use client";

import React from "react";
import { CreateWorkSpaceForm } from "./create-workspace-form";
import { ResponsiveModal } from "@/components/reponsive-modal";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkSpaceForm onCanel={close} />
    </ResponsiveModal>
  );
};
