import styled from '@emotion/styled';
import { darken } from '@mui/material';
import { Box } from 'components/Box';
import Button from 'components/Button';
import { Container } from 'components/Container';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/MenuItem';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import { mainRoutes } from 'lib/router/Router';
import React from 'react';
import { Navlink } from '../Navlink';

export const PageHeader = () => {
  return (
    <Root display="flex" justifyContent="space-between">
      <Stack direction="row" spacing={8}>
        <Text variant="h1">Github Search App</Text>
        <StyledNav>
          <Stack
            direction="row"
            spacing={4}
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            {mainRoutes.map((route) => (
              <Navlink href={route.path} key={route.path}>
                {route.label}
              </Navlink>
            ))}
          </Stack>
        </StyledNav>
      </Stack>
      <DropdownMenu />
    </Root>
  );
};

const DropdownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml="auto">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {mainRoutes.map((route) => (
          <MenuItem key={route.path} style={{padding: 0 }}>
            <MenuNavLink
              href={route.path}
              style={{ width: '100%', }}
              onClick={handleClose}
            >
              {route.label}
            </MenuNavLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const MenuNavLink = styled(Navlink)`
    width:100%;
    padding: ${props => props.theme.spacing(2,4)};
    min-width:8rem;
`

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
`;
