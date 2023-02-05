import { Box } from 'components/Box';
import Button from 'components/Button';
import { LeftArrowIcon, RightArrowIcon } from 'components/Icons';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { useGetRepos } from 'lib/api/GithubQueries';
import React from 'react';
import { useFiltersContext } from './context/FiltersContext';

export const SearchResultFooter = () => {
  const { filters, setFilters } = useFiltersContext();
  const { data } = useGetRepos();

  return (
    <Stack ml="auto" my={4} spacing={2}>
      <Text>Current Page: {filters.page} of {data?.allPage}</Text>
      <Stack direction="row" spacing={4}>
        <Button
          startIcon={<LeftArrowIcon />}
          disabled={filters.page <= 1}
          onClick={() =>
            setFilters((values) => ({ page: values.page - 1 }), 'replaceIn')
          }
        >
          Prev
        </Button>
        <Button
          endIcon={<RightArrowIcon />}
          onClick={() =>
            setFilters((values) => ({ page: values.page + 1 }), 'replaceIn')
          }
          disabled={data?.isLast}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
