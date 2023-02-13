import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import React from 'react'

export const Link: React.FC<MuiLinkProps> = ({ ...props }) => {
	return <MuiLink {...props} underline="hover" />
}
