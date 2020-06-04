import Repository from 'models/Repository';

export const getRepositories = async (): Promise<Repository[]> => {
  const response = await fetch(
    'https://api.github.com/users/emilioschepis/repos',
    {
      headers: {
        accept: 'application/vnd.github.v3+json',
      },
    },
  );

  return await response.json();
};
