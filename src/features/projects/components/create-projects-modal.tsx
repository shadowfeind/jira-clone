"use client";

import React from "react";
import { CreateProjectForm } from "./create-projects-form";
import { ResponsiveModal } from "@/components/reponsive-modal";
import { useCreateProjectModal } from "../hooks/use-create-projects-modal";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCanel={close} />
    </ResponsiveModal>
  );
};
