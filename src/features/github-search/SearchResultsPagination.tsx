import { Box } from 'components/Box';
import Button from 'components/Button';
import { LeftArrowIcon, RightArrowIcon } from 'components/Icons';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import React from 'react';
import { SearchFilterState, useFiltersContext } from './context/FiltersContext';

interface SearchResultsPaginationProps {
  allPage?: number;
  isLast?: boolean;
  handleSearch: (filters: SearchFilterState) => void;
}

export const SearchResultsPagination: React.FC<
  SearchResultsPaginationProps
> = ({ allPage, isLast, handleSearch }) => {
  const { filters, setFilters } = useFiltersContext();

  return (
    <Stack ml="auto" my={4} spacing={2}>
      <Text>
        Current Page: {filters.page} of {allPage}
      </Text>
      <Stack direction="row" spacing={4}>
        <Button
          startIcon={<LeftArrowIcon />}
          disabled={filters.page <= 1}
          onClick={() => {
            setFilters((values) => ({ page: values.page - 1 }), 'replaceIn');
            handleSearch({...filters, page: filters.page - 1 });
          }}
        >
          Prev
        </Button>
        <Button
          endIcon={<RightArrowIcon />}
          onClick={() => {
            setFilters((values) => ({ page: values.page + 1 }), 'replaceIn')
            handleSearch({...filters, page: filters.page + 1 });
          }
          }
          disabled={isLast}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
