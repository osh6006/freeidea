import { sortDict } from '@/constants/dictionary';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import { getStoreDetail, getStoreList, getStoreReviewList } from './service';

export const storeQueryKey = {
  all: ['store'],
  lists: () => [...storeQueryKey.all, 'list'],
  list: (filter: object) => [...storeQueryKey.lists(), filter],
  details: () => [...storeQueryKey.all, 'detail'],
  detail: (id: string) => [...storeQueryKey.details(), id],
  suggest: () => [...storeQueryKey.all, 'suggest'],
};

export const storeReviewQueryKey = {
  all: ['store-review'],

  lists: () => [...storeReviewQueryKey.all, 'list'],
  list: (id: string, filter?: object) =>
    [...storeReviewQueryKey.lists(), id, filter].filter((v) => v !== undefined),

  details: () => [...storeReviewQueryKey.all, 'detail'],
  detail: (id: string) => [...storeReviewQueryKey.details(), id],
};

export const storeDetailOption = (id: string) =>
  queryOptions({
    queryKey: storeQueryKey.detail(id),
    queryFn: () => getStoreDetail(id),
  });

export const storeListOption = ({
  limit = 16,
  sort = sortDict.data.latest.en,
  category,
  useRange,
}: Parameters<typeof getStoreList>[0]) =>
  infiniteQueryOptions({
    queryKey: storeQueryKey.list({ limit, sort, category, useRange }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getStoreList({ page: pageParam, limit, sort, category, useRange }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
      };
    },
  });

export const storeReviewListOption = ({
  productId,
  page,
  limit = 10,
}: Parameters<typeof getStoreReviewList>[0]) =>
  queryOptions({
    queryKey: storeReviewQueryKey.list(productId, { page, limit }),
    queryFn: () => getStoreReviewList({ productId, page, limit }),
    placeholderData: keepPreviousData,
  });
