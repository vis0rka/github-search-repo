import React, { forwardRef } from 'react'
import { TextField as MuiTextField, StandardTextFieldProps as MuiTextFieldProps } from '@mui/material'

export interface TextFieldProps extends MuiTextFieldProps {
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        return (
            <MuiTextField inputRef={ref} {...props} margin='none' size='small'/>
        )
    },
)