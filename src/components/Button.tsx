import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  ButtonTypeMap,
  Theme,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { CircularProgress } from './CircularProgress';

type ExtraProps = {
  isLoading?: boolean;
};

export type ButtonProps = MuiButtonProps & ExtraProps;

const Button: ForwardRefRenderFunction<any, ButtonProps> = (
  {
    isLoading,
    children,
    disabled,
    variant = 'contained',
    color = 'primary',
    ...rest
  },
  ref
) => {
  const Root = variantMap[variant];

  return (
    <Root
      ref={ref}
      disableElevation
      disableRipple
      disabled={isLoading ? true : disabled}
      variant={variant}
      color={color}
      {...rest}
    >
      <ChildrenWrap $isLoading={isLoading}>{children}</ChildrenWrap>
      {isLoading && <StyledCircularProgress size="1.2em" />}
    </Root>
  );
};

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  color: inherit;
`;

const ChildrenWrap = styled.span<{ $isLoading?: boolean }>`
  opacity: ${(props) => (props.$isLoading ? 0 : 1)};
`;

export default forwardRef(
  Button as OverridableComponent<ButtonTypeMap<ExtraProps>>
);

const VERTICAL_SPACING = 1;
const HORIZONTAL_SPACING = 4;
const buttonStyles = (theme: Theme) => css`
  transition: all 150ms;
  text-transform: uppercase;
  font-weight: 600;
  padding: ${theme.spacing(VERTICAL_SPACING, HORIZONTAL_SPACING)};
  border-radius: 8px;
  position: relative;
  font-size: 0.9rem;
  &:focus-visible {
    outline: solid 1px ${theme.palette.primary.main};
  }
`;

const TextButton = styled(MuiButton)`
  ${(props) => buttonStyles(props.theme)}

  padding: 0;
  background: none;
  border-radius: 0;
  border-bottom: solid 1px transparent;
  &:hover,
  &:focus-visible {
    background: none;
    filter: brightness(0.8);
  }
`;

const OutlinedButton = styled(MuiButton)`
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  &:hover,
  &:active,
  &.Mui-disabled {
    border: 1px solid ${(props) => props.theme.palette.primary.main};
    background-color: rgb(255 255 255 / 15%);
  }
`;

const ContainedButton = styled(MuiButton)`
  ${(props) => buttonStyles(props.theme)}

  background: linear-gradient(
            to right bottom,
            ${(props) => props.theme.palette.primary.main},
            ${(props) => props.theme.palette.primary.dark}
        );

  color: white;
  text-transform: uppercase;

  &:hover,
  &:focus-visible {
    filter: brightness(1.1);
  }
`;

const variantMap: Record<
  NonNullable<MuiButtonProps['variant']>,
  typeof TextButton | typeof ContainedButton | typeof OutlinedButton
> = {
  text: TextButton,
  contained: ContainedButton,
  outlined: OutlinedButton,
};
