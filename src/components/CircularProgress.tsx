import styled from '@emotion/styled'
import {
    CircularProgress as MuiCircularProgress,
    CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material'
import React from 'react'

export interface CircularProgressProps extends MuiCircularProgressProps {}

export const CircularProgress: React.FC<CircularProgressProps> = props => {
    return <StyledCircularProgress {...props} />
}

const StyledCircularProgress = styled(MuiCircularProgress)`
    color: ${props => props.theme.palette.white};
`
