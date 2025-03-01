import { sortDict } from '@/constants/dictionary';
import { getNextPageParam } from '@/lib/tanstack-query-helper';
import { IBasicLoungeFeedParams } from '@/types/lounge';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import {
  getBestChallengeList,
  getChallenge,
  getChallengeList,
  getChallengePortfolioList,
  getLoungefollowingAuthorList,
  getloungeFeedList,
} from './service';

export const challengeQueryKey = {
  all: ['challenge'],

  recent: ['challenge', 'recent'],
  bests: ['challenge', 'best'],
  best: (id: string) => ['challenge', 'best', id],

  details: ['challenge', 'detail'],
  detail: (id: string) => ['challenge', 'detail', id],

  list: ['challenge', 'list'],

  portfolioLists: ['challenge', 'portfolio', 'list'],
  portfolioList: (id: string, params?: object) =>
    ['challenge', 'portfolio', 'list', id, params].filter(
      (v) => v !== undefined
    ),
};

export const loungeFeedQueryKey = {
  all: ['loungeFeed'],

  followingAuthor: ({ limit }: { limit?: number }) =>
    [...loungeFeedQueryKey.all, 'followingAuthor', limit].filter(
      (v) => v !== undefined
    ),

  lists: () => [...loungeFeedQueryKey.all, 'lists'],
  feedList: ({ limit }: { limit?: number }) =>
    [...loungeFeedQueryKey.lists(), 'feed', limit].filter(
      (v) => v !== undefined
    ),
};

export const challengeListQueryOption = () =>
  queryOptions({
    queryKey: challengeQueryKey.list,
    queryFn: () => getChallengeList(),
    placeholderData: keepPreviousData,
  });

export const challengeDetailQueryOption = (id: string) =>
  queryOptions({
    queryKey: challengeQueryKey.detail(id),
    queryFn: () => getChallenge(id),
    placeholderData: keepPreviousData,
  });

export const challengePortfolioListQueryOption = (
  id: string,
  {
    limit = 8,
    sort = sortDict.data.latest.en,
  }: { limit?: number; sort?: string }
) =>
  infiniteQueryOptions({
    queryKey: challengeQueryKey.portfolioList(id, { limit, sort }),
    queryFn: ({ pageParam }) =>
      getChallengePortfolioList(id, { page: pageParam, limit, sort }),
    initialPageParam: 1,
    getNextPageParam: ({ count, page }) =>
      getNextPageParam({ count, page }, limit),
    placeholderData: keepPreviousData,
    select: (data) => ({
      ...data,
      flattenData: data.pages.flatMap((page) => page.list),
    }),
  });

export const bestChallengeQueryOption = (id: string) =>
  queryOptions({
    queryKey: challengeQueryKey.best(id),
    queryFn: () => getBestChallengeList(id),
    placeholderData: keepPreviousData,
  });

// Lounge Feed
export const loungeFollowingAuthorQueryOption = ({
  limit = 10,
}: IBasicLoungeFeedParams) =>
  infiniteQueryOptions({
    queryKey: loungeFeedQueryKey.followingAuthor({ limit }),
    queryFn: ({ pageParam }) =>
      getLoungefollowingAuthorList({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: ({ page, count }) => getNextPageParam({ page, count }),
    placeholderData: keepPreviousData,
    select: (data) => ({
      ...data,
      flattenData: data.pages.flatMap((page) => page.list),
    }),
  });

export const loungeFeedListQueryOption = ({
  limit = 10,
}: IBasicLoungeFeedParams) =>
  infiniteQueryOptions({
    queryKey: loungeFeedQueryKey.feedList({ limit }),
    queryFn: ({ pageParam }) => {
      return getloungeFeedList({ page: pageParam, limit });
    },
    initialPageParam: 1,
    getNextPageParam: ({ page, count }) => {
      return getNextPageParam({ page, count }, limit);
    },
    select: (data) => {
      return {
        ...data,
        flattenData: data.pages.flatMap((page) => page.list),
      };
    },
  });
