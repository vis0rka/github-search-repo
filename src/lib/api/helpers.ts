import { dateRadiosNormalizer } from 'features/github-search/SearchDatePicker';
import {
  starsAndSizeNormalizer,
} from 'features/github-search/SearchSizeAndSizeFilter';
import { GetRepoParams } from './GithubApi';

const normalizers: Record<string, any> = {
  size: starsAndSizeNormalizer,
  stars: starsAndSizeNormalizer,
  created: dateRadiosNormalizer,
};

export const queryParamsNormalizer = (params: GetRepoParams) => {
  let query = '';
  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;

    if (key === 'search') {
      query += value;
    }

    if (key === 'user' || key === 'org') {
      query += ` ${key}:${value}`;
    }

    if (key === 'language' || key === 'topic') {
      query += ` ${key}:${value.join(',')}`;
    }

    if (key === 'size' || key === 'stars' || key === 'created') {
      const operator = value[0];

      if (operator === 'between') {
        query += normalizers[key][operator].query(key, value[1], value[2]);
      } else {
        query += normalizers[key][operator].query(key, value[1]);
      }
    }
  }

  return query;
};
