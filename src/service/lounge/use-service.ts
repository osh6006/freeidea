import { useSearchParams } from 'next/navigation';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  bestChallengeQueryOption,
  challengeDetailQueryOption,
  challengeListQueryOption,
  challengePortfolioListQueryOption,
  loungeFeedListQueryOption,
  loungeFollowingAuthorQueryOption,
} from './query-option';

export function useGetChallengeDetail(id: string) {
  return useQuery(challengeDetailQueryOption(id));
}

export function useGetChallengeList() {
  return useQuery(challengeListQueryOption());
}

export function useGetChallengePortfolioList(id: string) {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || undefined;
  return useInfiniteQuery(challengePortfolioListQueryOption(id, { sort }));
}

export function useGetBestChallengeList(id: string) {
  return useQuery(bestChallengeQueryOption(id));
}

export function useGetLoungeFollowingAuthor() {
  return useInfiniteQuery(
    loungeFollowingAuthorQueryOption({
      limit: 10,
    })
  );
}
export function useLoungeFeedListQuery() {
  return useInfiniteQuery(
    loungeFeedListQueryOption({
      limit: 5,
    })
  );
}
