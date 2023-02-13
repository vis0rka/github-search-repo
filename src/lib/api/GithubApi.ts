import {
  StarsAndSizeOperators,
  radiosNormalizer,
} from 'features/github-search/SearchSizeAndSizeFilter';
import { ApiBase } from './ApiBase';
import { Endpoints } from "@octokit/types";
import { DateOperators, dateRadiosNormalizer } from 'features/github-search/SearchDatePicker';

export interface GetRepoParams {
  search: string;
  in: string[];
  order: 'desc' | 'asc';
  sort: 'stars' | 'forks' | 'default';

  page: number;
  forks?: string;
  stars?: string[];
  user?: string;
  org?: string;
  language?: string[];
  topic?: string[];
  size?: string[];
  created?: string[];
}

const PER_PAGE = 10;

export type GetRepos =
  Endpoints["GET /search/repositories"]["response"]["data"] & {
    allPage:number,
    isLast:boolean,
  };

export const cache = new Map<string, GetRepos>();

const getSerializedParams = (params: GetRepoParams) => {
  try {
    const serializedParams = JSON.stringify(params);
    return serializedParams;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export class GithubApi extends ApiBase {
  getRepo = async (params: GetRepoParams) => {
    const cacheKey = getSerializedParams(params);

    if(cache.has(cacheKey)) {
      return cache.get(cacheKey)!
    }

    const starParams = (() => {
      if (!params?.stars) return '';

      const operator = params?.stars[0] as StarsAndSizeOperators;

      if (operator === 'between') {
        return radiosNormalizer[operator].query(
          'stars',
          params?.stars[1],
          params?.stars[2]
        );
      }

      return radiosNormalizer[operator].query('stars', params.stars[1]);
    })();
    const createdParams = (() => {
      if (!params?.created) return '';

      const operator = params?.created[0] as DateOperators;

      if (operator === 'between') {
        return dateRadiosNormalizer[operator].query(
          'created',
          params?.created[1],
          params?.created[2]
        );
      }

      return dateRadiosNormalizer[operator].query('created', params.created[1]);
    })();

    const sizeParams = (() => {
      if (!params?.size) return '';

      const operator = params?.size[0] as StarsAndSizeOperators;

      if (operator === 'between') {
        return radiosNormalizer[operator].query(
          'size',
          params?.size[1],
          params?.size[2]
        );
      }

      return radiosNormalizer[operator].query('size', params.size[1]);
    })();

    const userParams = params?.user ? ` user:${params.user}` : '';
    const organizationParams = params?.org ? ` org:${params.org}` : '';
    const languageParams = params?.language
      ? ` language:${params.language.join(',')}`
      : '';
    const topicParams = params?.topic ? ` topic:${params.topic.join(',')}` : '';
    const res = await this.client.request(`GET /search/repositories`, {
      q: `${
        params.search
      }${userParams}${organizationParams}${languageParams}${topicParams}${starParams}${sizeParams}${createdParams}+in:${params.in.join(
        ','
      )}&type=Repositories`,
      per_page: PER_PAGE,
      order: params.order,
      sort: params.sort === 'default' ? undefined : params.sort,
      page: params.page,
    });

    const data = {
      ...res.data,
      allPage: Math.ceil(res.data.total_count / PER_PAGE),
      isLast: res.data.total_count / (params.page * PER_PAGE) <= 1,
    }

    cache.set(cacheKey, data)

    return data
  };
}
