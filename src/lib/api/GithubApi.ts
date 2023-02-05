import { ApiBase } from './ApiBase';

export interface GetRepoParams {
  search: string;
  in: string[];
  order: 'desc' | 'asc';
  sort: 'stars' | 'forks' | 'default';
  page: number;
}

const PER_PAGE = 10;

export class GithubApi extends ApiBase {
  getRepo = async (params: GetRepoParams) => {
    const res = await this.client.request(`GET /search/repositories`, {
      q: `${params.search}+in:${params.in.join(',')}&type=Repositories`,
      per_page: PER_PAGE,
      order: params.order,
      sort: params.sort === 'default' ? undefined : params.sort,
      page: params.page,
    });

    return {
      ...res.data,
      allPage: Math.ceil(res.data.total_count / PER_PAGE),
      isLast: res.data.total_count / (params.page * PER_PAGE) <= 1,
    };
  };
}
