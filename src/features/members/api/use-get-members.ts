import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type props = {
  workspaceId: string;
};

export const useGetMembers = ({ workspaceId }: props) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error("failed to fetch members");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
