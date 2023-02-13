import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import React from 'react'

export interface BoxProps extends MuiBoxProps {}

export const Box = React.forwardRef<any, BoxProps>((props, ref) => {
	return <MuiBox {...props} ref={ref} />
})
