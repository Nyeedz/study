import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type Repository = {
  full_name: string;
  description: string;
};

export function Repos() {
  const {
    data: repositories,
    isFetching,
    error,
  } = useQuery<Repository[]>(
    ['repos', 1],
    async () => {
      const response = await axios.get('https://api.github.com/users/nyeedz/repos&page=1');

      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {repositories?.map((repo: Repository) => {
        return (
          <li key={repo.full_name}>
            <Link to={`repo/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
