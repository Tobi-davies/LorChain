import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "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",
});

const q = "per_page:100";

export default async function handler(req: any, res: any) {
  const response = await octokit.request(
    "GET /users/{username}/repos?per_page=100",

    {
      //   q,
      username: "Tobi-davies",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  res.status(200).json(response);
}
