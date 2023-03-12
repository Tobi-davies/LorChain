import { Octokit } from "octokit";

export default async function handler(req: any, res: any) {
  const octokit = new Octokit();
  const q = "is:open is:issue label:good-first-issue";

  const response = await octokit.request("GET /search/issues", {
    q,
  });

  console.log("response", response);

  const results = response.data.items.map((item) => ({
    name: item.title,
    author: item?.user?.login,
    labels: item.labels.map((label) => label.name),
    url: item.html_url,
  }));

  const random = Math.floor(Math.random() * (results.length + 1));

  res.status(200).json(results[random]);
}

// export default function handler(req: any, res: any) {
//   const issue = {
//     name: "Issue title",
//     author: "eddiejaoude",
//     labels: [
//       "🏁 status: ready for dev",
//       "⭐ goal: addition",
//       "🔢 points: 1",
//       "🟨 priority: medium",
//       "good first issue",
//     ],
//     url: "https://github.com/EddieHubCommunity/good-first-issue-finder/issues/96",
//   };

//   res.status(200).json(issue);
// }
