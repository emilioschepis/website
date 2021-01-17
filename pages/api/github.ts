import type { NextApiRequest, NextApiResponse } from 'next';

import Repository from '@/models/Repository';

export type GitHubResponse = {
  followers: number;
  stars: number;
  repos: Repository[];
};

export default async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const user = await fetch('https://api.github.com/users/emilioschepis', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${process.env.GITHUB_TOKEN}`,
    },
  }).then((r) => r.json());
  const rawRepos = await fetch('https://api.github.com/users/emilioschepis/repos?per_page=100', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${process.env.GITHUB_TOKEN}`,
    },
  }).then((r) => r.json());

  const followers = user.followers;
  const repos = rawRepos.filter((repo) => !repo.fork).sort((a, b) => b['stargazers_count'] - a['stargazers_count']);
  const stars = repos.reduce((acc, repo) => acc + repo['stargazers_count'], 0);

  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
  res.status(200).json({ followers, repos, stars });
};
