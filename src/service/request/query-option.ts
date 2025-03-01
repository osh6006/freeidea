import { IRequestListParam } from '@/types/request';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import { getRequestData, getRequestDetail } from './service';

export const requestQueryKey = {
  all: ['request'],

  lists: () => [...requestQueryKey.all, 'list'],
  list: (params: object) =>
    [...requestQueryKey.lists(), 'main', params].filter(
      (el) => el !== undefined
    ),

  details: () => [...requestQueryKey.all, 'detail'],
  detail: (id: string) => [...requestQueryKey.details(), id],
};

export const requestDetailOption = (id: string) =>
  queryOptions({
    enabled: !!id,
    queryKey: requestQueryKey.detail(id),
    queryFn: () => getRequestDetail(id),
  });

export const requestListOption = (params: Omit<IRequestListParam, 'page'>) => {
  return infiniteQueryOptions({
    queryKey: requestQueryKey.list(params),
    queryFn: ({ pageParam }) =>
      getRequestData({
        page: pageParam,
        ...params,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.count > (params?.limit || 10) * lastPage.page
        ? lastPage.page + 1
        : undefined,
    placeholderData: keepPreviousData,
    select: (data) => ({
      ...data,
      flattenData: data.pages.flatMap((page) => page.list),
    }),
  });
};
