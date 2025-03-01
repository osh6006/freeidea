'use client';

import { Icon } from '@/components/icon';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { challengeQueryKey } from '@/service/lounge/query-option';
import { useGetBestChallengeList } from '@/service/lounge/use-service';
import {
  useLikePortfolio,
  usePangPortfolio,
  useScrapPortfolio,
} from '@/service/portfolio/use-service';
import { ChallengePortfolio } from '@/types/challenge';

import ChallengeCard from './challenge-card';

export default function BestChallenge({ id }: { id: string }) {
  const { data } = useGetBestChallengeList(id);

  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  const { mutate: pangingPortfolioMutate } = usePangPortfolio();
  const { mutate: likePortfolioMutate } = useLikePortfolio();
  const { mutate: scrapPortfolioMutate } = useScrapPortfolio();

  if (!data || data.length === 0) return null;

  const handleSocialAction = ({
    field,
    portfolioId,
    value,
    countField,
  }: {
    portfolioId: string;
    field: 'isMembershipLiked' | 'isLiked' | 'isScrapping';
    value: boolean;
    countField: 'likes' | 'scraps' | 'membershipLikes';
  }) => {
    return setQueriesData<ChallengePortfolio[]>(
      {
        queryKey: challengeQueryKey.best(id),
      },
      (prev) => {
        return prev.map((item) =>
          item.portfolioId === portfolioId
            ? {
                ...item,
                [field]: value,
                [countField]: value
                  ? item[countField] + 1
                  : item[countField] - 1,
              }
            : item
        );
      }
    );
  };

  const onPangClick = ({
    isMembershipLiked,
    portfolioId,
  }: {
    portfolioId: string;
    isMembershipLiked: boolean;
  }) => {
    const prevData = handleSocialAction({
      field: 'isMembershipLiked',
      portfolioId,
      value: isMembershipLiked,
      countField: 'membershipLikes',
    });
    pangingPortfolioMutate(
      { isMembershipLiked, portfolioId },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onLikeClick = ({
    isLiked,
    portfolioId,
  }: {
    portfolioId: string;
    isLiked: boolean;
  }) => {
    const prevData = handleSocialAction({
      field: 'isLiked',
      portfolioId,
      value: isLiked,
      countField: 'likes',
    });
    likePortfolioMutate(
      { id: portfolioId, isLiked },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onScrapClick = ({
    isScrapping,
    portfolioId,
  }: {
    portfolioId: string;
    isScrapping: boolean;
  }) => {
    const prevData = handleSocialAction({
      field: 'isScrapping',
      portfolioId,
      value: isScrapping,
      countField: 'scraps',
    });
    scrapPortfolioMutate(
      { portfolioId, isScrapping },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const medal = [
    <Icon.RankingGlod
      key="gold"
      className="size-[65px]"
    />,
    <Icon.RankingSilver
      key="silver"
      className="size-[65px]"
    />,
    <Icon.RankingBronze
      key="bronze"
      className="size-[65px]"
    />,
  ];

  return (
    <section className="w-full bg-slate-800 flex flex-col gap-[30px] py-20 mb-[54px] justify-center">
      <h3 className="text-white typo-title-32-bold-150 text-center">
        베스트작
      </h3>
      <div className="flex gap-[20px] w-full justify-center">
        {data.slice(0, 3).map((cardProps, index) => (
          <div
            key={cardProps.userId}
            className="flex flex-col items-center gap-[30px]"
          >
            <div className="flex flex-col gap-[10px] items-center text-white">
              {medal[index]}
              <span className="typo-title-20-bold-100-tight">
                {index + 1} 등
              </span>
            </div>
            <div className="bg-white p-[20px] rounded-[10px]">
              <ChallengeCard
                {...cardProps}
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
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
