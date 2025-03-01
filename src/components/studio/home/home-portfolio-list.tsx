import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SecureLink } from '@/components/common/secure-button';
import PortfolioSkeleton from '@/components/common/skeleton/portfolio-skeleton';
import StoreSkeleton from '@/components/common/skeleton/store-skeleton';
import { Icon } from '@/components/icon';
import {
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '@/components/ui/card';
import { ELEMENT_ID } from '@/constants/element-id';
import { PATH } from '@/constants/path';
import { useScrapPortfolio } from '@/service/portfolio/use-service';
import { studioQueryKey } from '@/service/studio/query-option';
import { Portfolio } from '@/types/portfolio';
import { useQueryClient } from '@tanstack/react-query';

interface HomePortfolioListProps {
  portfolioList: Portfolio[];
  totalCount: number;
  isLoading: boolean;
}

const HomePortfolioList = ({
  portfolioList,
  totalCount,
  isLoading,
}: HomePortfolioListProps) => {
  const { id: studioId }: { id: string } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useScrapPortfolio();

  const handleScrap = (portfolioId: string, isScrapping: boolean) => {
    mutate(
      { portfolioId, isScrapping: !isScrapping },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: studioQueryKey.portfolioHome(studioId),
          });
        },
      }
    );
  };

  return (
    <>
      <h2 className="typo-title-24-bold-140-tight mt-[50px]">
        업로드한 포트폴리오
      </h2>
      <ul className="grid grid-cols-4 mt-[20px] gap-x-[20px]">
        {isLoading ? (
          <>
            <PortfolioSkeleton />
            <PortfolioSkeleton />
            <PortfolioSkeleton />
            <PortfolioSkeleton />
          </>
        ) : (
          <>
            {portfolioList.map(
              ({ portfolioId, portfolioImageUrl, isScrapping }, i) => {
                const isLast = i === 3;
                return (
                  <li key={portfolioId}>
                    <CardThumbnail>
                      {!isLast ? (
                        <SecureLink
                          requiredLevel={'USER'}
                          href={PATH.portfolioDetail(portfolioId)}
                        >
                          <CardThumbnailImage
                            src={portfolioImageUrl}
                            alt="portfolioThumbnail"
                            sizes="400px"
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        </SecureLink>
                      ) : (
                        <Link
                          href={`${PATH.studio(studioId)}?tab=portfolio#${ELEMENT_ID.studioTab}`}
                        >
                          {totalCount > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white z-10 typo-title-32-bold-150">
                              + {totalCount - 4}
                            </div>
                          )}
                          <CardThumbnailImage
                            src={portfolioImageUrl}
                            alt="portfolioThumbnail"
                            sizes="200px"
                          />
                        </Link>
                      )}
                      <CardThumbnailButton
                        onClick={() => handleScrap(portfolioId, isScrapping)}
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
              }
            )}
          </>
        )}
      </ul>
    </>
  );
};

export default HomePortfolioList;
