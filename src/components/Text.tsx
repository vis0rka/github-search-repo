import { Typography, TypographyTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

type TextProps = TypographyTypeMap['props']

export const Text: OverridableComponent<TypographyTypeMap> = (
	props: TextProps,
) => {
	return <Typography {...props} />
}
