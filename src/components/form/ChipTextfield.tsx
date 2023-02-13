import React from 'react'
import { StandardTextFieldProps } from '@mui/material'
import { Stack } from 'components/Stack'
import { AddChipsIcon } from 'components/Icons'
import { Chip } from 'components/Chip'
import styled from '@emotion/styled'
import { maxWidth, StyledTextField } from './TextField'
import { Text } from 'components/Text'
import { Box } from 'components/Box'

interface ChipTextfield {
	inputProps: Omit<StandardTextFieldProps, 'value' | 'onChange'>
	value: string[]
	handleChange: (value: string[]) => void
}

const MAX_CHIPS_LENGTH = 5

export const ChipTextfield: React.FC<ChipTextfield> = ({
	inputProps,
	handleChange,
	value,
}) => {
	const [chips, setChips] = React.useState<string[]>([])
	const [text, setText] = React.useState('')
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [minLengthError, setMinLengthError] = React.useState(false)

	React.useEffect(() => {
		setChips(value)
	}, [value])

	React.useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				handleAddChips()
			}
		}

		inputRef?.current?.addEventListener('keydown', keyDownHandler)

		return () => {
			inputRef?.current?.removeEventListener('keydown', keyDownHandler)
		}
	}, [text, chips])

	const handleAddChips = () => {
		if (text?.length < 3) {
			setMinLengthError(true)
			return
		}
		if (chips.includes(text)) return
		setChips([...chips, text])
		handleChange([...chips, text])
		setText('')
	}

	const handleDelete = (value: string) => {
		const newChips = chips.filter((chip) => chip !== value)
		setChips(newChips)
		handleChange(newChips)
	}

	return (
		<Stack spacing={2}>
			<StyledTextField
				inputRef={inputRef}
				{...inputProps}
				margin="none"
				size="small"
				value={text}
				onChange={(evt) => {
					setMinLengthError(false)
					setText(evt.target.value)
				}}
				InputProps={{
					endAdornment: (
						<AddChipsIcon
							onClick={() => handleAddChips()}
							style={{ cursor: 'pointer' }}
						/>
					),
				}}
				helperText={minLengthError && 'Type at least 3 characters'}
				error={minLengthError}
			/>
			<StyledChipContainer>
				{chips?.slice(0, MAX_CHIPS_LENGTH).map((chip) => {
					return (
						<Chip key={chip} label={chip} onDelete={() => handleDelete(chip)} />
					)
				})}
				{chips.length > MAX_CHIPS_LENGTH && (
					<Box display="flex" justifyContent="center" alignItems="center">
						<Text>... {chips.length - MAX_CHIPS_LENGTH} more</Text>
					</Box>
				)}
			</StyledChipContainer>
		</Stack>
	)
}

const StyledChipContainer = styled.div`
  max-width: ${maxWidth};
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: ${(props) => props.theme.spacing(1)};
  column-gap: ${(props) => props.theme.spacing(1)};
`
