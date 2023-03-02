import { Box } from 'components/Box';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { useFiltersContext } from 'features/github-search/context/FiltersContext';
import { SearchResults } from 'features/github-search/SearchResults';
import { SearchResultsHeader } from 'features/github-search/SearchResultsHeader';
import { SearchResultsPagination } from 'features/github-search/SearchResultsPagination';
import { api } from 'lib/api/Api';
import { GetRepoParams, GetRepos } from 'lib/api/GithubApi';
import React from 'react';
import { SearchBar } from '../../features/github-search/SearchBar';

export type SearchPageState = 'init' | 'idle' | 'loading' | 'error';

const SearchPage = () => {
  const { filters, setFilters } = useFiltersContext();
  const [state, setState] = React.useState<SearchPageState>('init');
  const [data, setData] = React.useState<GetRepos>();

  React.useEffect(() => {
    if (state === 'init') {
      if (!filters.search) {
        setState('idle');
        return;
      }
      setState('loading');
      const getData = async () => {
        try {
          const res = await api.github.getRepo(filters);
          setData(res);
          setState('idle');
          return res;
        } catch (error) {
          console.log(error);
          setState('error');
        }
      };

      getData();
    }
  }, [filters, state]);

  const getRepo = React.useCallback(
    async (filters: GetRepoParams) => {
      if (state === 'loading') return;
      setState('loading');
      setFilters({ page: null }, 'replaceIn');
      try {
        const res = await api.github.getRepo(filters);
        setData(res);
        setState('idle');
        return res;
      } catch (error) {
        console.log(error);
        setState('error');
      }
    },
    [setState, setData]
  );

  return (
    <Box p={4}>
      <SearchBar handleSearch={(filters) => getRepo(filters)} state={state} />
      <SearchResults
        data={data}
        state={state}
        data-testid="search-results"
        header={
          <SearchResultsHeader
            handleSearch={(filters) => getRepo(filters)}
            totalCount={data?.total_count}
          />
        }
        pagination={
          <SearchResultsPagination
            allPage={data?.allPage}
            isLast={data?.isLast}
            handleSearch={(filters) => getRepo(filters)}
          />
        }
      />
    </Box>
  );
};

export default SearchPage;
