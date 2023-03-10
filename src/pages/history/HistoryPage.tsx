import styled from '@emotion/styled';
import { Box } from 'components/Box';
import Button from 'components/Button';
import { ResizableDrawer } from 'components/ResizableDrawer';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { SearchResultItem } from 'features/github-search/card';
import { cache, GetRepos } from 'lib/api/GithubApi';
import React from 'react';
import { IReactComponentcWithChild } from 'utils/typeUtils';

const HistoryPage = () => {
  const [searchedData, setSearchedData] = React.useState<GetRepos | null>(null);

  const cacheKeys = React.useMemo(() => {
    const array: string[] = [];

    for (const key of cache.keys()) {
      array.push(key);
    }

    return array;
  }, []);

  const menu = React.useMemo(() => {
    return (
      <Stack spacing={2} p={2} alignItems="center">
        {!cacheKeys.length ? (
          <Text>Please search something on search page!</Text>
        ) : (
          cacheKeys.map((key) => {
            return (
              <Button key={key} variant="outlined">
                <StyledText
                  fontWeight={600}
                  onClick={() => setSearchedData(cache.get(key) ?? null)}
                >
                  {key}
                </StyledText>
              </Button>
            );
          })
        )}
      </Stack>
    );
  }, []);

  return (
    <>
      <ResizableDrawer menu={menu}>
        {!cacheKeys.length ? null : !searchedData ? (
          <DisplayBox> Please choose something</DisplayBox>
        ) : searchedData.items.length ? (
          <Stack spacing={4} p={4} width="100%">
            {searchedData.items?.map((item) => (
              <SearchResultItem key={item.id} repo={item} />
            ))}
          </Stack>
        ) : (
          <DisplayBox>Your search is empty</DisplayBox>
        )}
      </ResizableDrawer>
    </>
  );
};

const DisplayBox: React.FC<IReactComponentcWithChild> = ({ children }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <Text fontWeight={600} variant="h6">
        {children}
      </Text>
    </Box>
  );
};

const StyledText = styled(Text)`
  overflow-wrap: anywhere;
`;

export default HistoryPage;
