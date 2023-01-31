import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'
import React from 'react'

export interface MenuProps extends MuiMenuProps {}

export const Menu: React.FC<MenuProps> = props => {
    return <MuiMenu {...props} />
}
