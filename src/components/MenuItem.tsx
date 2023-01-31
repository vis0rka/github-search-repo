import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material'
import React from 'react'

export interface MenuItemProps extends MuiMenuItemProps {}

export const MenuItem: React.FC<MenuItemProps> = props => {
    return <MuiMenuItem {...props} />
}
