import styled from '@emotion/styled';
import { darken } from '@mui/material';
import { Box } from 'components/Box';
import { CheckBox } from 'components/form/CheckBox';
import { Radio, RadioGroup } from 'components/form/Radio';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { GetRepoParams } from 'lib/api/GithubApi';
import { useGetRepos } from 'lib/api/GithubQueries';
import React from 'react';
import { IReactComponentcWithChild } from 'utils/typeUtils';
import { useFiltersContext } from './context/FiltersContext';

export const SearchResultsHeader: React.FC<IReactComponentcWithChild> = ({
  children,
}) => {
  const { data } = useGetRepos();
  const { filters, setFilters } = useFiltersContext();
  const [orderError, setOrderError] = React.useState<boolean>(false);

  const handleOrderChange = (value: string) => {
    if (filters.sort === 'default' && filters.order === 'desc') {
      setOrderError(true);
      return;
    }
    setOrderError(false);
    setFilters({ order: value }, 'replaceIn');
  };

  const handleSortChange = (value: string) => {
    setFilters({ sort: value === 'default' ? undefined : value }, 'replaceIn');
    setOrderError(false);
  };

  return (
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={4}>
          <Stack direction="row" alignItems="center">
            <Text mr={2}>Sort by:</Text>
            <RadioContainer
              value={filters.sort}
              onChange={(evt) => handleSortChange(evt.target.value)}
            >
              <Radio label="default" value="default" />
              <Radio label="stars" value="stars" />
              <Radio label="forks" value="forks" />
            </RadioContainer>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center">
              <Text mr={2}>Order by:</Text>
              <RadioContainer
                value={filters.order}
                onChange={(evt) => handleOrderChange(evt.target.value)}
              >
                <Radio label="desc" value="desc" />
                <Radio label="asc" value="asc" />
              </RadioContainer>
            </Stack>
            {orderError && <Text fontWeight={600} variant='caption' color='error'>Change sort from default to stars or forks!</Text>}
          </Stack>
        </Stack>
        <Text>Total results: {data?.total_count}</Text>
      </Box>
  );
};


const RadioContainer = styled(RadioGroup)`
  flex-direction: row;
`;
