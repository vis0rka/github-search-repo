import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { Radio, RadioGroup } from 'components/form/Radio'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { GetRepoParams } from 'lib/api/GithubApi'
import React from 'react'
import { SearchFilterState, useFiltersContext } from './context/FiltersContext'

interface SearchResultsHeaderProps {
	totalCount?: number
	handleSearch: (filters: SearchFilterState) => void
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
	totalCount,
	handleSearch,
}) => {
	const { filters, setFilters } = useFiltersContext()
	const [orderError, setOrderError] = React.useState<boolean>(false)

	const handleOrderChange = (value: string) => {
		if (filters.sort === 'default' && filters.order === 'desc') {
			setOrderError(true)
			return
		}
		setOrderError(false)
		setFilters({ order: value }, 'replaceIn')
		handleSearch({ ...filters, order: value as GetRepoParams['order'] })
	}

	const handleSortChange = (value: string) => {
		setFilters({ sort: value === 'default' ? undefined : value }, 'replaceIn')
		setOrderError(false)
		handleSearch({ ...filters, sort: value as GetRepoParams['sort'] })
	}

	return (
		<Box
			mb={4}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
		>
			<Stack direction="row" spacing={4}>
				<Stack direction="row" alignItems="center">
					<Text mr={2}>Sort by:</Text>
					<RadioContainer
						value={filters.sort}
						onChange={(evt) => handleSortChange(evt.target.value)}
					>
						<Radio label="default" value="default" />
						<Radio label="stars" value="stars" />
						<Radio label="forks" value="forks" />
					</RadioContainer>
				</Stack>
				<Stack>
					<Stack direction="row" alignItems="center">
						<Text mr={2}>Order by:</Text>
						<RadioContainer
							value={filters.order}
							onChange={(evt) => handleOrderChange(evt.target.value)}
						>
							<Radio label="desc" value="desc" />
							<Radio label="asc" value="asc" />
						</RadioContainer>
					</Stack>
					{orderError && (
						<Text fontWeight={600} variant="caption" color="error">
							Change sort from default to stars or forks!
						</Text>
					)}
				</Stack>
			</Stack>
			{totalCount && <Text>Total results: {totalCount}</Text>}
		</Box>
	)
}

const RadioContainer = styled(RadioGroup)`
  flex-direction: row;
`
