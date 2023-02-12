import { GridProps as MuiGridProps } from '@mui/material'
import MuiGrid from '@mui/material/Unstable_Grid2'
import React from 'react'

export interface GridProps extends MuiGridProps {}

export const Grid: React.FC<GridProps> = props => {
    return <MuiGrid {...props} />
}
