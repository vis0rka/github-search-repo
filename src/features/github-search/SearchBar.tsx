import { Box } from 'components/Box';
import Button from 'components/Button';
import { CheckBox } from 'components/form/CheckBox';
import { TextField } from 'components/form/TextField';
import { DownArrowIcon, SearchIcon } from 'components/Icons';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { api } from 'lib/api/Api';
import { useGetRepos } from 'lib/api/GithubQueries';
import React from 'react';
import { initalFilters, useFiltersContext } from './context/FiltersContext';

export const SearchBar = () => {
  const { filters, setFilters } = useFiltersContext();
  const { refetch } = useGetRepos();
  const [error, setError] = React.useState<string>('');

  const handleCheckBoxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setFilters(
        (latestFilters) => ({ in: [...latestFilters.in, evt.target.name] }),
        'replaceIn'
      );
    } else {
      if (filters?.in?.length <= 1) return;
      setFilters(
        (latestFilters) => ({
          in: latestFilters.in.filter(
            (item: string) => item !== evt.target.name
          ),
        }),
        'replaceIn'
      );
    }
  };

  const handleSearch = () => {
    if (filters.search.length < 3) {
      setError('Type at least 3 characters');
      setFilters({ enabled: false }, 'replaceIn');
      return;
    }

    setFilters({ enabled: true }, 'replaceIn');
  };

  React.useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(filters.search)
        handleSearch();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [filters.search]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Box display="flex" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={4}>
          <TextField
            label="Search by"
            value={filters?.search ?? ''}
            onChange={(e) => {
              setError('');
              setFilters({ enabled: false }, 'replaceIn');
              setFilters({ search: e.target.value }, 'replaceIn');
            }}
            error={!!error}
            helperText={error}
          />
          <Text>In:</Text>
          <CheckBox
            label="name"
            name="name"
            onChange={handleCheckBoxChange}
            checked={filters?.in?.includes('name')}
          />
          <CheckBox
            label="description"
            name="description"
            onChange={handleCheckBoxChange}
            checked={filters?.in?.includes('description')}
          />
          <CheckBox
            label="readme"
            name="readme"
            onChange={handleCheckBoxChange}
            checked={filters?.in?.includes('readme')}
          />
        </Stack>
        <Stack direction="row" spacing={4} display="flex" alignItems="center">
          <Button startIcon={<SearchIcon />} onClick={() => handleSearch()}>
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              setFilters(
                {
                  ...initalFilters.search.default,
                },
                'replaceIn'
              )
            }
          >
            Reset
          </Button>
        </Stack>
      </Box>
      <Button startIcon={<DownArrowIcon />}>Advanced</Button>
    </Box>
  );
};
