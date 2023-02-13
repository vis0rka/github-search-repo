import styled from '@emotion/styled'
import { darken } from '@mui/material'
import { Box } from 'components/Box'
import { Skeleton } from 'components/Skeleton'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { GetRepos } from 'lib/api/GithubApi'
import { SearchPageState } from 'pages/search/SearchPage'
import React from 'react'
import { SearchResultItem } from './card'
import { SearchResultsPagination } from './SearchResultsPagination'
import { SearchResultsHeader } from './SearchResultsHeader'

interface SearchResultsProps {
	data: GetRepos | null
	state: SearchPageState
	pagination: React.ReactNode
	header: React.ReactNode
}

export const SearchResults: React.FC<SearchResultsProps> = ({
	data,
	state,
	pagination,
	header,
}) => {
	if (state === 'error') {
		return (
			<Text variant="h4" textAlign="center" color="error">
				Sorry something went wrong
			</Text>
		)
	}

	if (state === 'loading') {
		return (
			<Stack spacing={4} my={4}>
				{Array(10)
					.fill(true)
					.map((_, i) => (
						<Skeleton
							key={i}
							variant="rectangular"
							height="6rem"
							width="100%"
						/>
					))}
			</Stack>
		)
	}

	if (!data) {
		return (
			<Box my={4}>
				<Text textAlign="center" variant="h5">
					Please search something...
				</Text>
			</Box>
		)
	}

	if (data.total_count <= 1) {
		return (
			<Box my={4}>
				<Text textAlign="center" variant="h5">
					No Match! Please search something else...
				</Text>
			</Box>
		)
	}

	return (
		<Root>
			{header}
			<Stack spacing={4}>
				{data.items?.map((item) => (
					<SearchResultItem key={item.id} repo={item} />
				))}
			</Stack>
			{pagination}
		</Root>
	)
}

const Root = styled(Stack)`
  padding: ${(props) => props.theme.spacing(4)};
  background-color: ${(props) =>
		darken(props.theme.palette.background.default, 0.1)};
`
