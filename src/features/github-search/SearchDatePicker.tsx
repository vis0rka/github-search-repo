import React from 'react'
import styled from '@emotion/styled'
import { Radio, RadioGroup } from 'components/form/Radio'
import { TextField } from 'components/form/TextField'
import { Slider } from 'components/Slider'
import { Stack } from 'components/Stack'
import { useDebounce } from 'hooks/useDebounce'
import { RootDatepicker } from 'components/DatePicker'

const dateOperators = [
	'before',
	'onBefore',
	'after',
	'onAfter',
	'between',
] as const

export type DateOperators = typeof dateOperators[number]

const dateFormatetter = (date: Date) => {
	const offset = date.getTimezoneOffset()
	date = new Date(date.getTime() - offset * 60 * 1000)
	return date.toISOString().split('T')[0]
}

export const dateRadiosNormalizer = {
	before: {
		label: 'before',
		query: (queryString: string, min: string) => ` ${queryString}:<${min}`,
	},
	onBefore: {
		label: 'on or before',
		query: (queryString: string, min: string) => ` ${queryString}:<=${min}`,
	},
	after: {
		label: 'after',
		query: (queryString: string, min: string) => ` ${queryString}:>${min}`,
	},
	onAfter: {
		label: 'on or after',
		query: (queryString: string, min: string) => ` ${queryString}:>=${min}`,
	},
	between: {
		label: 'between',
		query: (queryString: string, min: string, max: string) =>
			` ${queryString}:${min}..${max}`,
	},
}

interface SearchDatePickerProps {
	initalValue?: string[]
	handleChange: (value: string[] | null) => void
	head: React.ReactNode
}

export const SearchDatePicker: React.FC<SearchDatePickerProps> = ({
	initalValue,
	handleChange,
	head,
}) => {
	const [options, setOptions] = React.useState<DateOperators | undefined>(
		initalValue ? (initalValue[0] as DateOperators) : undefined,
	)

	const [dates, setDates] = React.useState<
		[Date | null, Date | null] | Date | null
	>(null)
	const onChange = (dates: [Date | null, Date | null] | Date) => {
		if (Array.isArray(dates)) {
			const [start, end] = dates
			setDates([start, end])
		} else {
			setDates(dates)
		}
	}

	React.useEffect(() => {
		if (!(dates && options)) return
		if (Array.isArray(dates)) {
			if (dates[0] && dates[1]) {
				handleChange([
					options,
					dateFormatetter(dates[0]),
					dateFormatetter(dates[1]),
				])
			}
			return
		}

		handleChange([options, dateFormatetter(dates!)])
	}, [options, dates])
	return (
		<Root spacing={4}>
			<Stack spacing={2} direction="row" display="flex" alignItems="center">
				{head}
				<RadioContainer
					value={options ?? ''}
					onChange={(evt) => {
						setOptions(evt.target.value as DateOperators)
						handleChange(null)
					}}
				>
					{dateOperators.map((operator) => (
						<Radio
							key={operator}
							label={dateRadiosNormalizer[operator].label}
							value={operator}
						/>
					))}
				</RadioContainer>
			</Stack>
			<Stack direction="row" spacing={8}>
				<RootDatepicker
					onChange={onChange}
					highlightDates={[new Date()]}
					showMonthDropdown
					showYearDropdown
					selectsRange={options === 'between' ? true : undefined}
					dateFormat="yyyy-MM-dd"
					placeholderText={'please select date'}
					selected={Array.isArray(dates) ? null : dates}
					startDate={Array.isArray(dates) ? dates[0] : null}
					endDate={Array.isArray(dates) ? dates[1] : null}
				/>
			</Stack>
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
