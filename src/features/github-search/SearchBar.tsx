import { Box } from 'components/Box'
import Button from 'components/Button'
import { Collapse } from 'components/Collapse'
import { CheckBox } from 'components/form/CheckBox'
import { ChipTextfield } from 'components/form/ChipTextfield'
import { TextField } from 'components/form/TextField'
import { DownArrowIcon, SearchIcon, UpArrowIcon } from 'components/Icons'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { SearchPageState } from 'pages/search/SearchPage'
import React from 'react'
import { IReactComponentcWithChild, nonNullable } from 'utils/typeUtils'
import {
	initalFilters,
	SearchFilterState,
	useFiltersContext,
} from './context/FiltersContext'
import { SearchDatePicker } from './SearchDatePicker'
import { SearchStarsAndSizeFilter } from './SearchSizeAndSizeFilter'

const minLengthTextFieldValidation = ['search', 'user', 'org'] as const

type MinLengthTextFieldValidationKey =
	typeof minLengthTextFieldValidation[number]

interface SearchBarProps {
	handleSearch: (filters: SearchFilterState) => void
	state: SearchPageState
}

export const SearchBar: React.FC<SearchBarProps> = ({
	handleSearch,
	state,
}) => {
	const { filters, setFilters } = useFiltersContext()
	const [minLengthError, setMinLengthError] = React.useState<
		MinLengthTextFieldValidationKey[]
	>([])
	const [isAdvancedActive, setIsAdvancedActive] = React.useState<boolean>(
		() =>
			!!filters.user ||
			!!filters.org ||
			!!filters.language?.length ||
			!!filters.topic?.length ||
			!!filters.stars?.length ||
			!!filters.language?.length ||
			!!filters.topic?.length ||
			!!filters.created?.length,
	)
	const searchRef = React.useRef<HTMLInputElement>(null)

	const handleCheckBoxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		if (evt.target.checked) {
			setFilters(
				(latestFilters) => ({ in: [...latestFilters.in, evt.target.name] }),
				'replaceIn',
			)
		} else {
			if (filters?.in?.length <= 1) return
			setFilters(
				(latestFilters) => ({
					in: latestFilters.in.filter(
						(item: string) => item !== evt.target.name,
					),
				}),
				'replaceIn',
			)
		}
	}

	const submitSearch = () => {
		let validationError: MinLengthTextFieldValidationKey[] = []

		if (isAdvancedActive) {
			validationError = minLengthTextFieldValidation
				.map((field) => {
					if (!filters[field]) return null

					return (filters[field]?.length ?? 0) < 3 ? field : null
				})
				.filter(nonNullable)
		} else {
			validationError = filters.search.length < 3 ? ['search'] : []
		}

		if (validationError.length) {
			setMinLengthError(validationError)
			return
		}
		handleSearch(filters)
	}

	const handleReset = () => {
		setFilters(
			{
				...initalFilters.search.default,
			},
			'replace',
		)
		setIsAdvancedActive(false)
	}

	React.useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				submitSearch()
			}
		}

		searchRef.current?.addEventListener('keydown', keyDownHandler)

		return () => {
			searchRef.current?.removeEventListener('keydown', keyDownHandler)
		}
	}, [filters.search])

	const isSearchDisabledInAdvance =
		!filters.search ||
		(!filters.user &&
			!filters.stars &&
			!filters.org &&
			!filters.language?.length &&
			!filters.topic?.length &&
			!filters.created?.length)

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Box display="flex" alignItems="center">
					<Stack direction="row" alignItems="center" spacing={4}>
						<TextField
							label="Search by"
							value={filters?.search ?? ''}
							onChange={(e) => {
								setMinLengthError([])
								setFilters({ search: e.target.value }, 'replaceIn')
							}}
							error={minLengthError.includes('search')}
							helperText={
								minLengthError.includes('search') &&
								'Type at least 3 characters'
							}
							ref={searchRef}
						/>
						<Text>In:</Text>
						<CheckBox
							label="name"
							name="name"
							onChange={handleCheckBoxChange}
							checked={filters?.in?.includes('name')}
						/>
						<CheckBox
							label="description"
							name="description"
							onChange={handleCheckBoxChange}
							checked={filters?.in?.includes('description')}
						/>
						<CheckBox
							label="readme"
							name="readme"
							onChange={handleCheckBoxChange}
							checked={filters?.in?.includes('readme')}
						/>
					</Stack>
					{!isAdvancedActive && (
						<Stack
							direction="row"
							spacing={4}
							display="flex"
							alignItems="center"
						>
							<SearchButtonField
								handleSearch={() => submitSearch()}
								handleReset={handleReset}
								isDisabled={false}
								state={state}
							/>
						</Stack>
					)}
				</Box>
				<Button
					startIcon={isAdvancedActive ? <UpArrowIcon /> : <DownArrowIcon />}
					onClick={() => setIsAdvancedActive((value) => !value)}
				>
					Advanced
				</Button>
			</Box>
			<Collapse orientation="vertical" in={isAdvancedActive}>
				<AdvancedSearchBar
					minLengthError={minLengthError}
					resetMinLengthError={() => setMinLengthError([])}
				>
					{isAdvancedActive && (
						<SearchButtonField
							handleSearch={() => submitSearch()}
							isDisabled={isSearchDisabledInAdvance}
							handleReset={() => handleReset()}
							state={state}
						/>
					)}
				</AdvancedSearchBar>
			</Collapse>
		</>
	)
}

interface SearchButtonFieldProps {
	handleSearch: VoidFunction
	handleReset: VoidFunction
	isDisabled: boolean
	state: SearchPageState
}

const SearchButtonField: React.FC<SearchButtonFieldProps> = ({
	handleSearch,
	handleReset,
	isDisabled = false,
	state,
}) => {
	return (
		<>
			<Button
				startIcon={<SearchIcon />}
				onClick={() => handleSearch()}
				disabled={isDisabled}
				isLoading={state === 'loading'}
			>
				Search
			</Button>
			<Button variant="outlined" onClick={() => handleReset()}>
				Reset
			</Button>
		</>
	)
}

interface AdvancedSearchBar extends IReactComponentcWithChild {
	minLengthError: MinLengthTextFieldValidationKey[]
	resetMinLengthError: VoidFunction
}

const AdvancedSearchBar: React.FC<AdvancedSearchBar> = ({
	children,
	minLengthError,
	resetMinLengthError,
}) => {
	const { filters, setFilters } = useFiltersContext()

	return (
		<Stack spacing={4} my={4}>
			<Stack direction="row" spacing={8}>
				<TextField
					label="User name"
					name="username"
					value={filters?.user ?? ''}
					onChange={(evt) => {
						resetMinLengthError()
						setFilters({ user: evt.target.value }, 'replaceIn')
					}}
					error={minLengthError.includes('user')}
					helperText={
						minLengthError.includes('user') ? 'Type at least 3 characters' : ''
					}
				/>
				<ChipTextfield
					value={filters.language ?? []}
					handleChange={(val) => setFilters({ language: val }, 'replaceIn')}
					inputProps={{ label: 'Language', name: 'language' }}
				/>
				<ChipTextfield
					value={filters.topic ?? []}
					handleChange={(val) => setFilters({ topic: val }, 'replaceIn')}
					inputProps={{ label: 'Topic', name: 'topic' }}
				/>
			</Stack>
			<Stack direction="row">
				<TextField
					label="Organization"
					name="organization"
					value={filters?.org ?? ''}
					onChange={(evt) => {
						resetMinLengthError()
						setFilters({ org: evt.target.value }, 'replaceIn')
					}}
					error={minLengthError.includes('org')}
					helperText={
						minLengthError.includes('org') ? 'Type at least 3 characters' : ''
					}
				/>
			</Stack>
			<Stack direction="row" spacing={4} justifyContent="space-between">
				<SearchStarsAndSizeFilter
					initalValue={filters.stars}
					handleChange={(value) => setFilters({ stars: value }, 'replaceIn')}
					head={<Text minWidth="5rem">★ stars</Text>}
				/>
				<SearchDatePicker
					initalValue={filters.created}
					head={<Text minWidth="5rem">Created</Text>}
					handleChange={(value) => setFilters({ created: value }, 'replaceIn')}
				/>
			</Stack>
			<Stack direction="row">
				<SearchStarsAndSizeFilter
					handleChange={(value) => setFilters({ size: value }, 'replaceIn')}
					initalValue={filters.size}
					head={<Text minWidth="5rem">⇅ size (kb)</Text>}
				/>
				<Stack
					display="flex"
					justifyContent="flex-end"
					alignItems="flex-end"
					direction="row"
					spacing={4}
					marginLeft="auto"
				>
					{children}
				</Stack>
			</Stack>
		</Stack>
	)
}
