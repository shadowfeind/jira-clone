import { parseAsString, useQueryState } from "nuqs";

export const useEditTaskModal = () => {
  const [taksId, setTaskId] = useQueryState(
    "edit-task",
    parseAsString
    // once i close the modal i do not want my url to be create-workspce=false
  );

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return {
    taksId,
    open,
    close,
    setTaskId,
  };
};
