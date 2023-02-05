import { useQuery } from '@tanstack/react-query';
import { useFiltersContext } from 'features/github-search/context/FiltersContext';
import { api } from './Api';
import { GetRepoParams } from './GithubApi';

export type GetRepos = NonNullable<ReturnType<typeof useGetRepos>['data']>;

export const useGetRepos = () => {
  const { filters } = useFiltersContext();
  
  const query = useQuery(
    [filters.search, filters.order, filters.sort, filters.page, ...filters.in],
    async () => {
      const res = await api.github.getRepo(filters);

      return res;
    },
    {
      enabled: !!filters.enabled,
      staleTime: Infinity,
    }
  );
  return query;
};
