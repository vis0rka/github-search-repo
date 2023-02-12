import React, { forwardRef } from 'react';
import {
  TextField as MuiTextField,
  StandardTextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import styled from '@emotion/styled';

export interface TextFieldProps extends MuiTextFieldProps {}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <StyledTextField inputRef={ref} {...props} margin="none" size="small" />
    );
  }
);

export const maxWidth = "14rem"

export const StyledTextField = styled(MuiTextField)`
  & .MuiInputBase-root {
    background-color: ${(props) => props.theme.palette.common.white};
  }

  max-width: ${maxWidth};
`;
