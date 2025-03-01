'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SecureLink } from '@/components/common/secure-button';
import { Icon } from '@/components/icon';
import { CommonAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '@/components/ui/card';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn } from '@/lib/utils';
import { portfolioQueryKey } from '@/service/portfolio/query-option';
import {
  usePortfolioDetail,
  useScrapPortfolio,
} from '@/service/portfolio/use-service';
import { useFollowAuthorMutation } from '@/service/studio/use-service';
import { PortfolioDetailType } from '@/types/portfolio';
import { Plus } from '@untitled-ui/icons-react';

function AuthorSection() {
  const params = useParams<{ id: string }>();
  const { data } = usePortfolioDetail(params.id);
  const { mutate: followMutate } = useFollowAuthorMutation();
  const { mutate: scrapMutate } = useScrapPortfolio();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  if (!data) throw new Error('Check the data initialization');

  const { author } = data;

  const onScrapClick = ({
    portfolioId,
    isScrapping,
  }: {
    portfolioId: string;
    isScrapping: boolean;
  }) => {
    const prevData = setQueriesData<PortfolioDetailType>(
      {
        queryKey: portfolioQueryKey.detail(params.id),
      },
      (prev) => {
        const { portfolio: prevPortfolio } = prev.author;

        const updatedList = prevPortfolio.list.map((portfolio) => ({
          ...portfolio,
          isScrapping:
            portfolio.portfolioId === portfolioId
              ? isScrapping
              : portfolio.isScrapping,
        }));

        return {
          ...prev,
          author: {
            ...prev.author,
            portfolio: {
              ...prev.author.portfolio,
              list: updatedList,
            },
          },
        };
      }
    );
    scrapMutate(
      { portfolioId, isScrapping },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onFollowClick = () => {
    const prevData = setQueriesData<PortfolioDetailType>(
      {
        queryKey: portfolioQueryKey.detail(params.id),
      },
      (prev) => ({
        ...prev,
        author: {
          ...prev.author,
          isFollowing: !prev.author.isFollowing,
          followers: !prev.author.isFollowing
            ? prev.author.followers + 1
            : prev.author.followers - 1,
        },
      })
    );
    followMutate(
      {
        studioId: author.studioId,
        isFollowing: !author.isFollowing,
      },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  return (
    <section className="flex items-center gap-[10px] w-full">
      <div className="flex flex-col gap-[20px] flex-1">
        <div className="flex items-center justify-between gap-[10px] w-full">
          <Link
            className="flex items-center gap-[10px]"
            href={PATH.studio(author.studioId)}
          >
            <CommonAvatar
              nickname={author.nickname}
              src={author.profileImageUrl}
              className="size-[48px]"
            />

            <div className="flex flex-col gap-[4px] flex-1">
              <span className="typo-body-16-medium-100-tight">
                {author.nickname}
              </span>
              <span className="typo-body-14-regular-150-tight">
                {author.introduction}
              </span>
            </div>
          </Link>

          <Button
            variant={author.isFollowing ? 'tertiary' : 'accent'}
            size="lg"
            className="flex items-center justify-center gap-[6px] w-[160px]"
            onClick={onFollowClick}
          >
            {author.isFollowing ? (
              `팔로잉 ${author.followers}명`
            ) : (
              <>
                <Plus className="size-[20px]" />
                팔로우 {author.followers}명
              </>
            )}
          </Button>
        </div>
        <ul className="flex gap-[10px]">
          {author.portfolio.list
            .slice(0, 4)
            .map(({ portfolioImageUrl, portfolioId, isScrapping }, index) => (
              <CardThumbnail
                key={portfolioId}
                className=" max-w-[180px]"
              >
                <SecureLink
                  requiredLevel={'USER'}
                  className={cn(
                    index === 3 &&
                      ' before:content-["더보기"] before:absolute before:z-[5] before:text-center before:content-center before:typo-title-24-bold-140-tight before:text-white before:bg-black/50 before:size-full'
                  )}
                  href={
                    index === 3
                      ? `${PATH.studio(author.studioId)}?tab=portfolio`
                      : PATH.portfolioDetail(portfolioId)
                  }
                >
                  <CardThumbnailImage
                    src={portfolioImageUrl}
                    alt="author-portfolio-image"
                  />
                </SecureLink>
                <CardThumbnailButton
                  onClick={() =>
                    onScrapClick({ portfolioId, isScrapping: !isScrapping })
                  }
                >
                  {isScrapping ? (
                    <Icon.BookmarkTonerSelect />
                  ) : (
                    <Icon.BookmarkToner />
                  )}
                </CardThumbnailButton>
              </CardThumbnail>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default AuthorSection;
