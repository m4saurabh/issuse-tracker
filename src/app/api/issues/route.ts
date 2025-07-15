import { github } from "@/lib/github";

export async function POST(request: Request) {
  const body = await request.json();
  const { owner, repo } = body;

  const response = await github.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return Response.json(response.data);
}
