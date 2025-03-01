import { sortDict } from '@/constants/dictionary';
import { IQnaBasicParams } from '@/types/qna';
import { ISearchParameter } from '@/types/search';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import {
  getFeedSearchProduct,
  getSearchAll,
  getSearchAuthor,
  getSearchProduct,
  getSearchQnaList,
  getSearchRequest,
} from './service';

export const searchQueryKey = {
  all: ['search'],

  autoComplete: (keyword: string) => [...searchQueryKey.all, keyword],

  tabs: (name: 'product' | 'request' | 'author') => [
    ...searchQueryKey.all,
    name,
  ],
  tab: (name: 'product' | 'request' | 'author', params: ISearchParameter) => [
    ...searchQueryKey.all,
    name,
    params,
  ],

  qna: (params: object) =>
    [...searchQueryKey.all, 'qna', params].filter((el) => el !== undefined),
};

export const searchAutoCompleteQueryOption = (keyword: string) => {
  return queryOptions({
    enabled: !!keyword,
    queryKey: searchQueryKey.autoComplete(keyword),
    queryFn: () => getSearchAll(keyword),
    placeholderData: keepPreviousData,
  });
};

export const searchProductQueryOption = ({
  keyword,
  ...params
}: Omit<ISearchParameter, 'page' | 'limit'>) => {
  return infiniteQueryOptions({
    queryKey: searchQueryKey.tab('product', {
      keyword,
      ...params,
    }),
    initialPageParam: 1,
    enabled: !!keyword,
    queryFn: ({ pageParam = 1 }) =>
      getSearchProduct({
        keyword,
        page: pageParam,
        ...params,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.list.length > 0 ? lastPage?.page + 1 : undefined;
    },

    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap(({ list }) => list),
    }),
  });
};

export const searchFeedProductQueryOption = ({
  keyword,
  ...params
}: Omit<ISearchParameter, 'page' | 'limit'>) => {
  return infiniteQueryOptions({
    queryKey: searchQueryKey.tab('product', {
      keyword,
      ...params,
    }),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getFeedSearchProduct({
        keyword,
        page: pageParam,
        ...params,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.list.length > 0 ? lastPage?.page + 1 : undefined;
    },

    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap(({ list }) => list),
    }),
  });
};

export const searchRequestQueryOption = ({
  keyword,
  ...params
}: Omit<ISearchParameter, 'page' | 'limit'>) => {
  return infiniteQueryOptions({
    queryKey: searchQueryKey.tab('request', {
      keyword,
      ...params,
    }),
    initialPageParam: 1,
    enabled: !!keyword,
    queryFn: ({ pageParam = 1 }) =>
      getSearchRequest({
        keyword,
        page: pageParam,
        ...params,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.list.length > 0 ? lastPage?.page + 1 : undefined;
    },

    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap(({ list }) => list),
    }),
  });
};

export const searchAuthorQueryOption = ({
  keyword,
  sort = sortDict.data.followers.en,
  category,
  useRange,
}: Omit<ISearchParameter, 'page' | 'limit'>) => {
  return infiniteQueryOptions({
    queryKey: searchQueryKey.tab('author', {
      keyword,
      sort,
      category,
      useRange,
    }),
    initialPageParam: 1,
    enabled: !!keyword,
    queryFn: ({ pageParam = 1 }) =>
      getSearchAuthor({
        page: pageParam,
        keyword,
        sort,
        category,
        useRange,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.list.length > 0 ? lastPage?.page + 1 : undefined;
    },
    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap(({ list }) => list),
    }),
  });
};

export const searchQnaQueryOption = ({
  keyword,
  params,
}: {
  keyword: string;
  params: Omit<IQnaBasicParams, 'page'>;
}) => {
  return infiniteQueryOptions({
    queryKey: searchQueryKey.qna({ keyword, params }),
    initialPageParam: 1,
    enabled: !!keyword,
    queryFn: ({ pageParam }) =>
      getSearchQnaList({
        page: pageParam,
        limit: params.limit,
        keyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap(({ list }) => list),
    }),
  });
};
