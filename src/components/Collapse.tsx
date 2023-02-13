import {
	Collapse as MuiCollapse,
	CollapseProps as MuiCollapseProps,
} from '@mui/material'
import React from 'react'

interface CollapseProps extends MuiCollapseProps {}

export const Collapse: React.FC<CollapseProps> = (props) => {
	return <MuiCollapse {...props} />
}
