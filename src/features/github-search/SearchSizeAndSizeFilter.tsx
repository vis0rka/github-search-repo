import styled from '@emotion/styled'
import { Radio, RadioGroup } from 'components/form/Radio'
import { TextField } from 'components/form/TextField'
import { Slider } from 'components/Slider'
import { Stack } from 'components/Stack'
import { useDebounce } from 'hooks/useDebounce'
import React from 'react'

interface SearchStarsAndSizeFilterProps {
	head: React.ReactNode
	initalValue?: string[]
	handleChange: (value: string[]) => void
}

const startAndSizeOperators = [
	'equal',
	'greaterThan',
	'lessThan',
	'between',
] as const

export type StarsAndSizeOperators = typeof startAndSizeOperators[number]

export const radiosNormalizer = {
	equal: {
		label: 'equal',
		query: (queryString: string, min: string) =>
			` ${queryString}:${min}..${min}`,
	},
	greaterThan: {
		label: 'greater than',
		query: (queryString: string, min: string) => ` ${queryString}:${min}..*`,
	},
	lessThan: {
		label: 'less than',
		query: (queryString: string, min: string) => ` ${queryString}:*..${min}`,
	},
	between: {
		label: 'between',
		query: (queryString: string, min: string, max: string) =>
			` ${queryString}:${min}..${max}`,
	},
}

export const SearchStarsAndSizeFilter: React.FC<SearchStarsAndSizeFilterProps> =
	({ head, initalValue, handleChange }) => {
		const [min, setMin] = React.useState<number | null>(
			initalValue ? parseInt(initalValue[1]) : null,
		)
		const [max, setMax] = React.useState<number | null>(
			initalValue?.[2] ? parseInt(initalValue[2]) : null,
		)
		const [between, setBetween] = React.useState<number[]>([min ?? 0, max ?? 0])
		const [options, setOptions] = React.useState<
			StarsAndSizeOperators | undefined
		>(initalValue ? (initalValue[0] as StarsAndSizeOperators) : undefined)
		const isBetween = options === 'between'
		React.useEffect(() => {
			if (initalValue === undefined) {
				setMin(null)
				setMax(null)
				setOptions(undefined)
				setBetween([0, 0])
			}
		}, [initalValue])

		React.useEffect(() => {
			if (min === null || !options) return
			if (isBetween && max) {
				handleChange([options, min.toString(), max?.toString()])
				return
			}

			handleChange([options, min.toString()])
		}, [options, min, max])

		const handleSliderChange = () => {
			if (isBetween) {
				handleChange([options, between[0].toString(), between[1].toString()])
			}
		}

		const debouncedOnChange = useDebounce(handleSliderChange)

		return (
			<Root spacing={4}>
				<Stack spacing={2} direction="row" display="flex" alignItems="center">
					{head}
					<RadioContainer
						value={options ?? ''}
						onChange={(evt) =>
							setOptions(evt.target.value as StarsAndSizeOperators)
						}
					>
						{startAndSizeOperators.map((operator) => (
							<Radio
								key={operator}
								label={radiosNormalizer[operator].label}
								value={operator}
							/>
						))}
					</RadioContainer>
				</Stack>
				<Stack direction="row" spacing={8}>
					<TextField
						label={isBetween ? 'min' : 'number'}
						type="number"
						name="number"
						value={min ?? ''}
						onChange={(evt) => {
							const value = parseInt(evt.target.value)
							if (isNaN(value) || value < 0) {
								setMin(null)
								return
							}
							setBetween([value, between[1]])
							setMin(value)
						}}
					/>
					{isBetween && (
						<TextField
							label="max"
							name="max"
							type="number"
							value={max ?? ''}
							onChange={(evt) => {
								const value = parseInt(evt.target.value)
								if (isNaN(value)) {
									setMax(null)
									return
								}
								setBetween([between[0], value])
								setMax(value)
							}}
						/>
					)}
				</Stack>
				{isBetween && (
					<Slider
						value={between}
						min={min ?? undefined}
						max={max ?? undefined}
						onChange={(_, newValue) => {
							debouncedOnChange()
							setBetween(newValue as number[])
						}}
						valueLabelDisplay="auto"
					/>
				)}
			</Root>
		)
	}

const RadioContainer = styled(RadioGroup)`
  flex-direction: row;
`

const Root = styled(Stack)`
  background-color: ${(props) => props.theme.palette.background.paper};
  padding: ${(props) => props.theme.spacing(4)};
`
