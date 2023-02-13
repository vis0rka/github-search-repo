import {
	Container as MuiContainer,
	ContainerProps as MuiContainerProps,
} from '@mui/material'
import React from 'react'

export interface ContainerProps extends MuiContainerProps {}

export const Container: React.FC<ContainerProps> = (props) => {
	return <MuiContainer {...props} />
}
