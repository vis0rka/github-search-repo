import { Alert } from '@mui/material'
import React from 'react'
import { IReactComponentcWithChild } from 'utils/typeUtils'
import { WarningIcon } from './Icons'


export const ErrorMessage: React.FC<IReactComponentcWithChild> = ({ children }) => {

    return (
        <Alert icon={<WarningIcon />} severity="error">
            {children ?? 'Sorry something went wrong...'}
        </Alert>
    )
}
