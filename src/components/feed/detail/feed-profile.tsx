'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SecureLink } from '@/components/common/secure-button';
import { Icon } from '@/components/icon';
import { CommonAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn } from '@/lib/utils';
import { feedQueryKey } from '@/service/feed/query-option';
import { useFeedDetailQuery } from '@/service/feed/use-service';
import { useScrapPortfolio } from '@/service/portfolio/use-service';
import { useFollowAuthorMutation } from '@/service/studio/use-service';
import { IFeedDeatil } from '@/types/feed';
import { Plus } from '@untitled-ui/icons-react';

const FeedProfile = () => {
  const { id }: { id: string } = useParams();
  const { data: feedInfo } = useFeedDetailQuery(id);

  const { mutate: authorFollowMutate } = useFollowAuthorMutation();
  const { mutate: portfolioScrapMutate } = useScrapPortfolio();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  if (!feedInfo) {
    return null;
  }

  const {
    userId,
    nickname,
    introduction,
    isFollowing,
    followers,
    portfolio,
    profileImageUrl,
    studioId,
  } = feedInfo.author;

  const handleAuthorFollow = () => {
    const prevData = setQueriesData<IFeedDeatil>(
      {
        queryKey: feedQueryKey.details(),
      },
      (oldData) => ({
        ...oldData,
        author: {
          ...oldData.author,
          followers: !isFollowing
            ? oldData.author.followers + 1
            : oldData.author.followers - 1,
          isFollowing: !isFollowing,
        },
      })
    );
    authorFollowMutate(
      {
        studioId,
        isFollowing: !isFollowing,
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };
  const handlePortfolioScrap = (isScrapping: boolean, portfolioId: string) => {
    const prevData = setQueriesData<IFeedDeatil>(
      {
        queryKey: feedQueryKey.details(),
      },
      (oldData) => ({
        ...oldData,
        author: {
          ...oldData.author,
          portfolio: {
            ...oldData.author.portfolio,
            list: oldData.author.portfolio.list.map((info) => {
              if (info.portfolioId === portfolioId) {
                return {
                  ...info,
                  isScrapping: !isScrapping,
                };
              }
              return info;
            }),
          },
        },
      })
    );

    portfolioScrapMutate(
      {
        isScrapping: !isScrapping,
        portfolioId: portfolioId,
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  return (
    <section className="mt-[50px]">
      <div className="flex justify-between items-center">
        <Link href={PATH.studio(studioId)}>
          <div className="flex gap-x-[10px]">
            <CommonAvatar
              nickname={nickname}
              src={profileImageUrl}
              className="size-12 border"
            />
            <span className="flex flex-col justify-center">
              <div className="text-slate-800 typo-body-16-bold-100-tight">
                {nickname}
              </div>
              <div className="text-slate-500 typo-body-14-regular-150-tight">
                {introduction}
              </div>
            </span>
          </div>
        </Link>
        <Button
          className={cn(
            'typo-body-16-medium-100-tight gap-x-[6px] w-[160px]',
            !isFollowing ? 'bg-primary ' : 'bg-slate-300 hover:bg-slate-300/70'
          )}
          size="lg"
          onClick={handleAuthorFollow}
        >
          {!isFollowing ? <Plus className="untitled-icon" /> : null}
          {!isFollowing ? `팔로우 ${followers}명` : '팔로잉'}
        </Button>
      </div>
      <ul className="grid grid-cols-4 gap-x-[10px] mt-[20px]">
        {portfolio.list.map((info, i) => {
          const isLast =
            i === portfolio.list.length - 1 && portfolio.list.length >= 4;
          return (
            <Card key={info.portfolioId}>
              <CardThumbnail className="relative w-[172px] aspect-square rounded-[6px] overflow-hidden whitespace-nowrap">
                <SecureLink
                  requiredLevel={'USER'}
                  href={
                    isLast
                      ? PATH.studio(studioId)
                      : PATH.portfolioDetail(info.portfolioId)
                  }
                >
                  <CardThumbnailImage
                    alt={info.portfolioImageUrl + i}
                    src={info.portfolioImageUrl}
                    placeholder="blur"
                    blurDataURL={BLUR_IMG}
                    style={{
                      objectFit: 'cover',
                    }}
                    fill
                  />
                  {isLast && (
                    <div className="absolute w-full h-full z-10 bg-black/50 flex items-center justify-center text-white typo-title-24-bold-140-tight">
                      더보기
                    </div>
                  )}
                </SecureLink>
                <button
                  onClick={() =>
                    handlePortfolioScrap(info.isScrapping, info.portfolioId)
                  }
                  className="absolute bottom-2 right-2 z-20 "
                >
                  {info.isScrapping ? (
                    <Icon.BookmarkSelect />
                  ) : (
                    <Icon.Bookmark />
                  )}
                </button>
              </CardThumbnail>
            </Card>
          );
        })}
      </ul>
    </section>
  );
};

export default FeedProfile;
