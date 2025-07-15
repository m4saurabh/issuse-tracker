import { useQuery } from "@tanstack/react-query";

import type { Issue } from "@/types/issues";

interface UseIssuesParams {
  owner: string;
  repo: string;
  enabled?: boolean;
}

const fetchIssues = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<Issue[]> => {
  const response = await fetch("/api/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner, repo }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch issues");
  }
  const data = await response.json();

  console.log(data);
  return data;
};

export const useIssues = ({
  owner,
  repo,
  enabled = false,
}: UseIssuesParams) => {
  return useQuery({
    queryKey: ["issues", owner, repo],
    queryFn: () => fetchIssues({ owner, repo }),
    enabled: enabled && Boolean(owner && repo),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
