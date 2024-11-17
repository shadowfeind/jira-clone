import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGerProjectsTYpe = {
  taskId: string;
};

export const useGetTask = ({ taskId }: UseGerProjectsTYpe) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: {
          taskId,
        },
      });
      if (!response.ok) {
        throw new Error("failed to fetch task");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
