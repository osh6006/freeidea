import React from 'react';

import Inner from '@/components/common/inner';
import ScrollUpButton from '@/components/common/scroll-up-button';
import { SecureLink } from '@/components/common/secure-button';
import ChallengeBanner from '@/components/lounge/challenge/banner';
import BestChallenge from '@/components/lounge/challenge/best-challenge';
import ChallengeFilter from '@/components/lounge/challenge/challenge-filter';
import ChallengeList from '@/components/lounge/challenge/challenge-list';
import { buttonVariants } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { metadataMap } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import {
  bestChallengeQueryOption,
  challengeDetailQueryOption,
  challengeListQueryOption,
  challengePortfolioListQueryOption,
} from '@/service/lounge/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Edit02 } from '@untitled-ui/icons-react';

export const generateMetadata = metadataMap.challenge;

interface Props {
  searchParams: {
    cohort?: string;
    sort?: string;
    page?: string;
  };
}

async function LoungeChallengePage({ searchParams }: Props) {
  const queryClient = new QueryClient();

  const challengeList = await queryClient.fetchQuery(
    challengeListQueryOption()
  );

  const recentChallenge = challengeList.at(-1);
  if (!recentChallenge) throw new Error('챌린지 목록을 찾을 수 없습니다.');

  const sort = searchParams.sort;
  const cohort = Number(searchParams.cohort ?? recentChallenge.challengeNumber);
  const selectedChallenge = challengeList.find(
    ({ challengeNumber }) => challengeNumber === cohort
  );

  if (!selectedChallenge) throw new Error('챌린지를 찾을 수 없습니다.');

  await Promise.all([
    queryClient.prefetchQuery(
      bestChallengeQueryOption(selectedChallenge.challengeId)
    ),
    queryClient.prefetchQuery(
      challengeDetailQueryOption(selectedChallenge.challengeId)
    ),
    queryClient.prefetchInfiniteQuery(
      challengePortfolioListQueryOption(selectedChallenge.challengeId, {
        sort,
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <ChallengeBanner id={selectedChallenge.challengeId} />

        <Inner
          className="mt-[50px] mb-[20px]"
          maxWidth={1200}
        >
          <ChallengeFilter />
        </Inner>

        <BestChallenge id={selectedChallenge.challengeId} />

        <Inner
          className="mt-[50px] mb-[200px]"
          maxWidth={1200}
        >
          <ChallengeList id={selectedChallenge.challengeId} />
          <SecureLink
            href={PATH.portfolioCreate}
            className={cn(
              buttonVariants(),
              'rounded-full size-[100px] sticky bottom-[60px] left-full flex flex-col items-center gap-[6px]'
            )}
            requiredLevel="USER"
          >
            <Edit02 className="size-[20px]" />
            <div>참여하기</div>
          </SecureLink>
        </Inner>
      </main>
      <ScrollUpButton />
    </HydrationBoundary>
  );
}

export default LoungeChallengePage;
