import styled from '@emotion/styled';
import { darken, lighten } from '@mui/material';
import { Link } from 'components/Link';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { GetRepos } from 'lib/api/GithubApi';
import React from 'react';
import { ArrayElement } from 'utils/typeUtils';

interface SearchResultItemProps {
  repo: ArrayElement<GetRepos['items']>;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ repo }) => {
  return (
    <Root
      direction="row"
      spacing={6}
      display="flex"
      justifyContent="space-between"
    >
      <Stack spacing={1} width="10rem">
        <StyledText>{repo?.name}</StyledText>
        <Link href={repo?.svn_url} target="_blank">
          <StyledText>{repo?.full_name}</StyledText>
        </Link>
      </Stack>
      <Stack spacing={1} width={'10rem'}>
        <Text>Stars: {repo?.stargazers_count}</Text>
        <Text>Watchers: {repo?.watchers}</Text>
      </Stack>
      <Stack spacing={1} width={'10rem'}>
        <Text>Forks: {repo?.forks_count}</Text>
        <Text>Issues: {repo?.open_issues_count}</Text>
      </Stack>
      <Stack spacing={1} width={'18rem'}>
        <Text>{repo?.description}</Text>
      </Stack>
      <Stack spacing={1} width={'12rem'}>
        <Text>
          Created at: {new Date(repo?.created_at).toLocaleDateString()}
        </Text>
        <Text>
          Updated at: {new Date(repo?.updated_at).toLocaleDateString()}
        </Text>
      </Stack>
      <Stack spacing={4} direction="row" width={'12rem'} alignItems="center">
        <Text width="8rem">By: {repo.owner?.login}</Text>
        {repo.owner?.avatar_url ? (
          <Link href={repo?.owner?.html_url}>
            <StyledAvatar src={repo?.owner?.avatar_url} />
          </Link>
        ) : null}
      </Stack>
    </Root>
  );
};

const StyledAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const Root = styled(Stack)`
  background-color: ${(props) =>
    lighten(props.theme.palette.background.default, 0.1)};
  padding: ${(props) => props.theme.spacing(4)};
  box-shadow: ${(props) => props.theme.shadows[2]};
  overflow: hidden;
  flex-wrap: wrap;
`;

const StyledText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
