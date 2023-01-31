import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material'
import React from 'react'

export interface StackProps extends MuiStackProps {}

export const Stack: React.FC<StackProps> = props => {
    return <MuiStack {...props} />
}
