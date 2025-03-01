'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useScrapPortfolio } from '@/service/portfolio/use-service';
import { studioQueryKey } from '@/service/studio/query-option';
import { usePortfolioListQuery } from '@/service/studio/use-service';
import { Portfolio } from '@/types/portfolio';

import { SecureLink } from '../common/secure-button';
import PortfolioSkeleton from '../common/skeleton/portfolio-skeleton';
import { Icon, UntitledIcon } from '../icon';
import {
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '../ui/card';
import Spinner from '../ui/spinner';
import TabEmpty from './tab-empty';

const PortfolioCard = ({
  portfolio,
  isMe,
  onScrapClick,
}: {
  portfolio: {
    portfolioId: string;
    portfolioImageUrl: string;
    isScrapping: boolean;
    isShown: boolean;
  };
  isMe: boolean;
  onScrapClick: (portfolioId: string, isScrapping: boolean) => void;
}) => {
  const { portfolioId, portfolioImageUrl, isScrapping, isShown } = portfolio;

  if (!isShown && !isMe) return null;

  return (
    <li key={portfolioId}>
      <CardThumbnail>
        <SecureLink
          requiredLevel="USER"
          href={PATH.portfolioDetail(portfolioId)}
        >
          <CardThumbnailImage
            src={portfolioImageUrl}
            alt="portfolioThumbnail"
            style={{ objectFit: 'cover' }}
          />
        </SecureLink>
        <div className="absolute right-[10px] bottom-[10px] flex items-center gap-x-[10px]">
          {!isShown && (
            <div className="bg-[#71768066]/40 p-0.5 rounded-full size-10 flex items-center justify-center">
              <UntitledIcon.Lock01
                width={33}
                height={33}
                className="text-white "
                fill="#E3E0E1"
              />
            </div>
          )}
          <CardThumbnailButton
            onClick={() => onScrapClick(portfolioId, isScrapping)}
            className="static flex items-center justify-center"
          >
            {isScrapping ? (
              <Icon.BookmarkTonerSelect className="size-10" />
            ) : (
              <Icon.BookmarkToner className="size-10" />
            )}
          </CardThumbnailButton>
        </div>
      </CardThumbnail>
    </li>
  );
};

const TabPortfolio = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();

  const {
    data: portfolioData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  } = usePortfolioListQuery(id, {
    limit: 16,
  });

  const { mutate } = useScrapPortfolio();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (!isLoading && !portfolioData) return null;
  const portfolioList = portfolioData?.list || [];
  const isMe = id === myInfo?.studioId;

  const handleScrapClick = (portfolioId: string, isScrapping: boolean) => {
    const prevData = setInfinitePageQueriesData<Portfolio>(
      {
        queryKey: studioQueryKey.portfolio(),
      },
      {
        target: (item) => item.portfolioId === portfolioId,
        updater: (item) => {
          return {
            ...item,
            isScrapping: !isScrapping,
          };
        },
      }
    );

    mutate(
      {
        portfolioId,
        isScrapping: !isScrapping,
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  return (
    <>
      <ul className="grid grid-cols-4 mt-[20px] gap-[20px]">
        {isLoading ? (
          <>
            <PortfolioSkeleton />
            <PortfolioSkeleton />
            <PortfolioSkeleton />
            <PortfolioSkeleton />
          </>
        ) : (
          <>
            {portfolioList.map((portfolio) => (
              <PortfolioCard
                key={portfolio.portfolioId}
                portfolio={portfolio}
                isMe={isMe}
                onScrapClick={handleScrapClick}
              />
            ))}
          </>
        )}
        {isRefetching && (
          <div className="w-full flex items-center justify-center">
            <Spinner className="size-[40px]" />
          </div>
        )}
        <div ref={ref} />
      </ul>

      {portfolioList.length === 0 && !isLoading && (
        <div className="flex items-center justify-center w-full">
          <TabEmpty
            title="등록된 포트폴리오가 없어요"
            buttonTitle="포트폴리오 등록하러 가기"
            path={PATH.portfolioCreate}
            isMe={isMe}
          />
        </div>
      )}
    </>
  );
};

export default TabPortfolio;
