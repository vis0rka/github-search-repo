import styled from '@emotion/styled';
import { darken } from '@mui/material';
import { Box } from 'components/Box';
import { Skeleton } from 'components/Skeleton';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { useGetRepos } from 'lib/api/GithubQueries';
import React from 'react';
import { SearchResultItem } from './card';
import { useFiltersContext } from './context/FiltersContext';
import { SearchResultFooter } from './SearchResultFooter';
import { SearchResultsHeader } from './SearchResultsHeader';

export const SearchResults = () => {
  const { data, isError, isLoading, fetchStatus } = useGetRepos();

  if (isError) {
    return (
      <Text variant="h4" textAlign="center" color="error">
        Sorry something went wrong
      </Text>
    );
  }

  if (fetchStatus === 'fetching') {
    return (
      <Stack spacing={4} my={4}>
        {Array(10)
          .fill(true)
          .map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height="6rem"
              width="100%"
            />
          ))}
      </Stack>
    );
  }

  if (!data) {
    return (
      <Box my={4}>
        <Text textAlign="center" variant="h5">
          Please search something...
        </Text>
      </Box>
    );
  }

  if (data.total_count <= 1) {
    return (
      <Box my={4}>
        <Text textAlign="center" variant="h5">
          No MatchPlease search something else...
        </Text>
      </Box>
    );
  }

  return (
    <Root>
      <SearchResultsHeader />
      <Stack spacing={4}>
        {data.items?.map((item) => (
          <SearchResultItem key={item.id} repo={item} />
        ))}
      </Stack>
      <SearchResultFooter />
    </Root>
  );
};

const Root = styled(Stack)`
  padding: ${(props) => props.theme.spacing(4)};
  background-color: ${(props) =>
    darken(props.theme.palette.background.default, 0.1)};
`;
