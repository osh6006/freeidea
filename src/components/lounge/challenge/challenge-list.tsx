'use client';

import { useInView } from 'react-intersection-observer';

import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { challengeQueryKey } from '@/service/lounge/query-option';
import { useGetChallengePortfolioList } from '@/service/lounge/use-service';
import {
  useLikePortfolio,
  usePangPortfolio,
  useScrapPortfolio,
} from '@/service/portfolio/use-service';
import { ChallengePortfolio } from '@/types/challenge';

import ChallengeCard from './challenge-card';

export default function ChallengeList({ id }: { id: string }) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetChallengePortfolioList(id);

  const { mutate: scrapPortfolio } = useScrapPortfolio();
  const { mutate: likePortfolio } = useLikePortfolio();
  const { mutate: pangMutate } = usePangPortfolio();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  const handlePortfolioAction = <T extends string>({
    portfolioId,
    field,
    value,
    countField,
  }: {
    portfolioId: string;
    field: T;
    value: boolean;
    countField: 'scraps' | 'likes' | 'membershipLikes';
  }) => {
    return setInfinitePageQueriesData<ChallengePortfolio>(
      {
        queryKey: challengeQueryKey.portfolioList(id),
      },
      {
        target: (item) => item.portfolioId === portfolioId,
        updater: (prev) => ({
          ...prev,
          [field]: value,
          [countField]: value ? prev[countField] + 1 : prev[countField] - 1,
        }),
      }
    );
  };

  const onScrapClick = ({
    portfolioId,
    isScrapping,
  }: {
    portfolioId: string;
    isScrapping: boolean;
  }) => {
    const prevData = handlePortfolioAction({
      portfolioId,
      field: 'isScrapping',
      value: isScrapping,
      countField: 'scraps',
    });
    scrapPortfolio(
      { portfolioId, isScrapping },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onLikeClick = ({
    portfolioId,
    isLiked,
  }: {
    portfolioId: string;
    isLiked: boolean;
  }) => {
    const prevData = handlePortfolioAction({
      portfolioId,
      field: 'isLiked',
      value: isLiked,
      countField: 'likes',
    });

    likePortfolio(
      { id: portfolioId, isLiked },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onPangClick = ({
    portfolioId,
    isMembershipLiked,
  }: {
    portfolioId: string;
    isMembershipLiked: boolean;
  }) => {
    const prevData = handlePortfolioAction({
      portfolioId,
      field: 'isMembershipLiked',
      value: isMembershipLiked,
      countField: 'membershipLikes',
    });
    pangMutate(
      { portfolioId, isMembershipLiked },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  if (!data) return null;
  const { flattenData } = data;

  const sortedRancking = flattenData[0].ranking
    ? flattenData.sort((a, b) => a.ranking - b.ranking)
    : flattenData;

  return (
    <>
      <ul className="grid gap-x-[20px] gap-y-[50px] grid-cols-4">
        {sortedRancking.map(({ ...cardProps }) => (
          <ChallengeCard
            key={cardProps.portfolioId}
            onScrapClick={() =>
              onScrapClick({
                portfolioId: cardProps.portfolioId,
                isScrapping: !cardProps.isScrapping,
              })
            }
            onLikeClick={() =>
              onLikeClick({
                portfolioId: cardProps.portfolioId,
                isLiked: !cardProps.isLiked,
              })
            }
            onPangClick={() =>
              onPangClick({
                portfolioId: cardProps.portfolioId,
                isMembershipLiked: !cardProps.isMembershipLiked,
              })
            }
            {...cardProps}
          />
        ))}
      </ul>
      {hasNextPage && <div ref={ref} />}
    </>
  );
}
