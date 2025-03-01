'use client';

import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import { Icon } from '@/components/icon';
import {
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '@/components/ui/card';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { myScrapPortfolioQueryKey } from '@/service/mypage/query-option';
import { useMyScrapPortfolioListQuery } from '@/service/mypage/use-service';
import { useScrapPortfolio } from '@/service/portfolio/use-service';
import { Portfolio } from '@/types/mypage';

import { ScrapEmpty } from './scrap-empty';

const ScrapPortfolio = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMyScrapPortfolioListQuery();

  const { mutate } = useScrapPortfolio();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const { ref } = useInView({
    onChange: (inView) => {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (!data) return null;

  const portfolioList = data.flattenList;

  const onScrapClick = (portfolioId: string, isScrapping: boolean) => {
    const prevData = setInfinitePageQueriesData<Portfolio>(
      {
        queryKey: myScrapPortfolioQueryKey.lists(),
      },
      {
        target: (item) => item.portfolioId === portfolioId,
        updater: (item) => ({ ...item, isScrapping: !isScrapping }),
      }
    );

    mutate(
      { portfolioId, isScrapping: !isScrapping },
      {
        onError: () => rollbackQueriesData(prevData),
      }
    );
  };

  return (
    <>
      {portfolioList.length === 0 ? (
        <ScrapEmpty />
      ) : (
        <ul className="grid grid-cols-3 mt-[20px] gap-[20px] mb-[220px]">
          {portfolioList.map((portfolio, i) => {
            const { portfolioId, portfolioImageUrl, isScrapping } = portfolio;
            return (
              <li key={portfolioId}>
                <CardThumbnail>
                  <Link href={PATH.portfolioDetail(portfolioId)}>
                    <CardThumbnailImage
                      src={portfolioImageUrl}
                      alt={`portfolio${i}`}
                      fill
                    />
                  </Link>
                  <CardThumbnailButton
                    onClick={() => onScrapClick(portfolioId, isScrapping)}
                  >
                    {isScrapping ? (
                      <Icon.BookmarkTonerSelect
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Icon.BookmarkToner
                        width={40}
                        height={40}
                      />
                    )}
                  </CardThumbnailButton>
                </CardThumbnail>
              </li>
            );
          })}
          <div ref={ref} />
        </ul>
      )}
    </>
  );
};

export default ScrapPortfolio;
