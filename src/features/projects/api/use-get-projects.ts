import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGerProjectsTYpe = {
  workspaceId: string;
};

export const useGetProjects = ({ workspaceId }: UseGerProjectsTYpe) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error("failed to fetch projects");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
