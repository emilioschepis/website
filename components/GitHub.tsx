import useSWR from 'swr';

import { GitHubResponse } from '@/pages/api/github';

import RepoRow from './RepoRow';

const fetcher = async (url) => await fetch(url).then((r) => r.json());

const GitHub: React.FC = () => {
  const { data } = useSWR<GitHubResponse>('/api/github', fetcher);

  if (data === undefined) {
    return null;
  }

  return (
    <>
      <section className="prose mx-auto mb-4">
        <h2>My open source projects</h2>
        <p>
          I currently have {data.repos.length} public projects with a total of {data.stars} stars, and {data.followers}{' '}
          people follow me on GitHub!
        </p>
      </section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.repos.map((repo) => (
          <RepoRow key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  );
};

export default GitHub;
