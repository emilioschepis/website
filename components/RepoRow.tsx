import Repository from '@/models/Repository';

type RepoRowProps = {
  repo: Repository;
};

const RepoRow: React.FC<RepoRowProps> = ({ repo }) => {
  return (
    <a className="overflow-hidden border-2 p-2 rounded" href={repo.html_url}>
      <p className="font-bold text-blue-700">{repo.name}</p>
      <p className="text-gray-500">
        {repo.language} &mdash; {repo.stargazers_count} stars
      </p>
      <p className="text-gray-900">{repo.description}</p>
    </a>
  );
};

export default RepoRow;
