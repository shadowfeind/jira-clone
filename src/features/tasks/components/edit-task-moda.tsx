"use client";

import { ResponsiveModal } from "@/components/reponsive-modal";
import { useEditTaskModal } from "../hooks/use-edit-task-moda";
import { EditTaskFormWrapper } from "./edit-task-form-wrappe";

export const EditTaskModal = () => {
  const { taksId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taksId} onOpenChange={close}>
      {taksId && <EditTaskFormWrapper id={taksId} onCancel={close} />}
    </ResponsiveModal>
  );
};
