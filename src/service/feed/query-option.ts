import { IFeedBasicParameter } from '@/types/feed';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  getFeedCommentList,
  getFeedDetail,
  getFeedList,
  getFeedModify,
} from './service';

export const feedQueryKey = {
  all: ['feed'],

  lists: () => [...feedQueryKey.all, 'list'],
  list: (id: string, filter: object) => [...feedQueryKey.lists(), id, filter],

  details: () => [...feedQueryKey.all, 'detail'],
  detail: (id: string) => [...feedQueryKey.details(), id],

  modify: (id: string) => [...feedQueryKey.all, id],

  commentLists: () => [...feedQueryKey.all, 'commentList'],
  commentList: (id: string, filter: object) => [
    ...feedQueryKey.commentLists(),
    id,
    filter,
  ],
};

export const feedListOption = (
  studioId: string,
  params: IFeedBasicParameter
) => {
  return infiniteQueryOptions({
    queryKey: feedQueryKey.list(studioId, params),
    queryFn: ({ pageParam }) =>
      getFeedList(studioId, {
        page: pageParam,
        limit: params.limit || 5,
      }),
    enabled: !!studioId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};

export const feedDetailOption = (feedId: string) => {
  return queryOptions({
    queryKey: feedQueryKey.detail(feedId),
    queryFn: () => getFeedDetail(feedId),
    enabled: !!feedId,
  });
};

export const feedModifyOption = (feedId: string) => {
  return queryOptions({
    queryKey: feedQueryKey.modify(feedId),
    queryFn: () => getFeedModify(feedId),
    enabled: !!feedId,
    staleTime: 0,
  });
};

export const feedCommentOption = (
  feedId: string,
  params: IFeedBasicParameter
) => {
  return infiniteQueryOptions({
    queryKey: feedQueryKey.commentList(feedId, params),
    queryFn: ({ pageParam }) =>
      getFeedCommentList(feedId, { page: pageParam, ...params }),
    enabled: !!feedId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const { count, page } = data.pages[0];
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { list: flattenList, count, page };
    },
  });
};
