import { GetRepoParams } from 'lib/api/GithubApi';
import React, { createContext, useContext } from 'react';
import {
  ArrayParam,
  BooleanParam,
  DecodedValueMap,
  DelimitedArrayParam,
  NumberParam,
  QueryParamConfig,
  SetQuery,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

interface SearchFilterState {
  search: GetRepoParams['search'];
  in: GetRepoParams['in'];
  order: GetRepoParams['order']
  sort: GetRepoParams['sort']
  enabled: boolean
  page: number
  // fixing some weird use-query-params typing issue
  [key: string]: any;
}

interface FiltersContextState {
  filters: SearchFilterState;
  setFilters: SetQuery<SearchFilterState>;
}

const filtersContext = createContext<FiltersContextState>(
  {} as FiltersContextState
);

export const initalFilters = {
  search: withDefault<any, GetRepoParams['search']>(StringParam, ''),
  in: withDefault<any, GetRepoParams['in']>(DelimitedArrayParam, ['name']) as QueryParamConfig<string[]>,
  order: withDefault<any, GetRepoParams['order']>(StringParam, 'desc'),
  sort: withDefault<any, GetRepoParams['sort']>(StringParam, 'default'),
  enabled: withDefault<any, boolean>(BooleanParam, false),
  page: withDefault<any, number>(NumberParam, 1),
};

export const FilterContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [filters, setFilters] = useQueryParams(initalFilters);

  return (
    <filtersContext.Provider value={{ filters, setFilters }}>
      {children}
    </filtersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(filtersContext);

  if (context === undefined) {
    throw new Error(
      `'useFiltersContext' must be used within 'FilterContextProvider'`
    );
  }

  return context;
};
