import styled from '@emotion/styled'
import {
	FormControlLabel as MuiFormControlLabel,
	Radio as MuiRadio,
	RadioGroup as MuiRadioGroup,
	RadioGroupProps as MuiRadioGroupProps,
	RadioProps as MuiRadioProps,
} from '@mui/material'

interface RadioProps extends MuiRadioProps {
	label?: React.ReactNode
}

export const Radio: React.FC<RadioProps> = ({ label, ...rest }) => {
	return (
		<MuiFormControlLabel control={<StyledRadio {...rest} />} label={label} />
	)
}

const StyledRadio = styled(MuiRadio)`
    color: ${(props) => props.theme.palette.primary.main};
`

export const RadioGroup: React.FC<MuiRadioGroupProps> = ({ ...rest }) => {
	return <MuiRadioGroup {...rest} />
}
