import {
	StarsAndSizeOperators,
	starsAndSizeNormalizer,
} from 'features/github-search/SearchSizeAndSizeFilter'
import { ApiBase } from './ApiBase'
import { Endpoints } from '@octokit/types'
import {
	DateOperators,
	dateRadiosNormalizer,
} from 'features/github-search/SearchDatePicker'
import { queryParamsNormalizer } from './helpers'

export interface GetRepoParams {
	search: string
	in: string[]
	order: 'desc' | 'asc'
	sort: 'stars' | 'forks' | 'default'

	page: number
	stars?: string[]
	user?: string
	org?: string
	language?: string[]
	topic?: string[]
	size?: string[]
	created?: string[]
}

const PER_PAGE = 10

export type GetRepos =
	Endpoints['GET /search/repositories']['response']['data'] & {
		allPage: number
		isLast: boolean
	}

export const cache = new Map<string, GetRepos>()

const getSerializedParams = (params: GetRepoParams) => {
	try {
		const serializedParams = JSON.stringify(params)
		return serializedParams
	} catch (error) {
		console.log(error)
		return ''
	}
}

export class GithubApi extends ApiBase {
	getRepo = async (params: GetRepoParams) => {
		const cacheKey = getSerializedParams(params)
    	const query = queryParamsNormalizer(params)
		if (cache.has(cacheKey)) {
			return cache.get(cacheKey)
		}

		const res = await this.client.request('GET /search/repositories', {
			q: `${query}+in:${params.in.join(
				',',
			)}&type=Repositories`,
			per_page: PER_PAGE,
			order: params.order,
			sort: params.sort === 'default' ? undefined : params.sort,
			page: params.page,
		})

		const data = {
			...res.data,
			allPage: Math.ceil(res.data.total_count / PER_PAGE),
			isLast: res.data.total_count / (params.page * PER_PAGE) <= 1,
		}

		cache.set(cacheKey, data)

		return data
	}
}
