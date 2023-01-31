import styled from '@emotion/styled';
import { darken } from '@mui/material';
import { Box } from 'components/Box';
import { Container } from 'components/Container';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import React from 'react';
import { Navlink } from '../Navlink';

export const PageHeader = () => {
  return (
    <Root>
      <Stack direction="row" spacing={8}>
        <Text variant="h1">
          Github Search App
        </Text>
        <StyledNav>
          <Stack direction="row" spacing={4} alignItems='flex-end' justifyContent='flex-end'>
            <Navlink href="/search">Search</Navlink>
            <Navlink href="/history">History</Navlink>
          </Stack>
        </StyledNav>
      </Stack>
    </Root>
  );
};

const Root = styled(Box)`
  padding: ${(props) => props.theme.spacing(4)};
  border-bottom: solid 1px ${(props) => props.theme.palette.divider};
  //background-color: ${(props) =>
    darken(props.theme.palette.background.default, 0.1)};
  //box-shadow: ${(props) => props.theme.shadows[1]};
  width: 100%;
`;

const StyledNav = styled.nav`
    display: flex;
`