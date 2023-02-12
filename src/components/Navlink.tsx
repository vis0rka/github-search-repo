import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
} from 'react-router-dom';
import { Link, LinkProps } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';

interface NavlinkProps extends LinkProps {}

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & {
    href: RouterLinkProps['to'];
  }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink
      ref={ref}
      to={href}
      {...other}
    />
  );
});

export const Navlink: React.FC<NavlinkProps> = ({ ...props }) => {
  return (
    <StyledLink
      {...props}
      component={LinkBehavior}
      underline="none"
    />
  );
};


const StyledLink = styled(Link)`

  &.active {
    text-decoration: underline;
  }
` as typeof Link