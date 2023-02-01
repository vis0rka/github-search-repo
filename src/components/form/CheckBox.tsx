import styled from '@emotion/styled'
import {
    Checkbox as MuiCheckBox,
    CheckboxProps as MuiCheckBoxProps,
    FormControlLabel as MuiFormControlLabel,
} from '@mui/material'
import React from 'react'

interface CheckBoxProps extends MuiCheckBoxProps {
    label?: React.ReactNode
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label, ...rest }) => {
    return (
        <div>
            <MuiFormControlLabel control={<StyledCheckbox {...rest} />} label={label} />
        </div>
    )
}

const StyledCheckbox = styled(MuiCheckBox)`
    color: ${props => props.theme.palette.primary.main};
`
