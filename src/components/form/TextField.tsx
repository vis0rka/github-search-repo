import React, { forwardRef } from 'react'
import { TextField as MuiTextField, StandardTextFieldProps as MuiTextFieldProps } from '@mui/material'
import styled from '@emotion/styled'

export interface TextFieldProps extends MuiTextFieldProps {
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        return (
            <StyledTextField inputRef={ref} {...props} margin='none' size='small'/>
        )
    },
)

const StyledTextField = styled(MuiTextField)`
    background-color: ${props => props.theme.palette.common.white};

`