import React from 'react';

import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn } from '@/lib/utils';
import { searchQueryKey } from '@/service/search/query-option';
import { useFollowAuthorMutation } from '@/service/studio/use-service';
import { IAuthor } from '@/types/author';

import { SecureLink } from '../common/secure-button';
import { CardThumbnail, CardThumbnailImage } from '../ui/card';

const AuthorCard = ({
  studioId,
  profileImageUrl,
  nickname,
  followers,
  introduction,
  isFollowing,
  titleImageUrl,
  portfolio,
  isMine = false,
}: {
  studioId: string;
  profileImageUrl: string;
  nickname: string;
  followers: number;
  introduction: string;
  isFollowing: boolean;
  titleImageUrl: string;
  portfolio: { portfolioId: string; portfolioImageUrl: string }[];
  isMine?: boolean;
}) => {
  const { mutate: followAuthor } = useFollowAuthorMutation();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const portfolioList: (
    | {
        portfolioId: string;
        portfolioImageUrl: string;
      }
    | undefined
  )[] = Array(3)
    .fill(undefined)
    .map((_, i) => portfolio[i]);

  const onFollowClick = () => {
    const prevData = setInfinitePageQueriesData<IAuthor>(
      {
        queryKey: searchQueryKey.tabs('author'),
      },
      {
        target: (item) => item.studioId === studioId,
        updater: (item) => ({
          ...item,
          isFollowing: !isFollowing,
          followers: isFollowing ? followers - 1 : followers + 1,
        }),
      }
    );

    followAuthor(
      {
        studioId,
        isFollowing: !isFollowing,
      },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <Link
        key={studioId}
        href={PATH.studio(studioId)}
      >
        <CardThumbnail>
          <CardThumbnailImage
            alt="대표 이미지"
            src={titleImageUrl}
            className="object-cover"
            fallback={<div className="bg-slate-100 size-full aspect-square" />}
          />
        </CardThumbnail>
      </Link>
      <div className="flex justify-between gap-[10px] grow-0">
        {portfolioList.map((portfolio, i) => (
          <CardThumbnail key={portfolio?.portfolioId ?? i}>
            {portfolio?.portfolioId ? (
              <SecureLink
                requiredLevel={'USER'}
                href={PATH.portfolioDetail(portfolio.portfolioId)}
              >
                <CardThumbnailImage
                  src={portfolio.portfolioImageUrl}
                  alt={'서브 이미지' + i}
                  fill
                  sizes="100vw"
                  className="rounded-[6px] object-cover"
                />
              </SecureLink>
            ) : (
              <div className="rounded-[6px] bg-slate-100 size-full aspect-square" />
            )}
          </CardThumbnail>
        ))}
      </div>
      <div className="mt-[20px]">
        <div className="flex gap-x-[6px] items-center">
          <Link href={PATH.studio(studioId)}>
            <CommonAvatar
              nickname={nickname}
              src={profileImageUrl}
              className="size-[48px]"
            />
          </Link>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-x-[6px]">
              <Link
                href={PATH.studio(studioId)}
                className="typo-body-16-bold-100-tight text-slate-800"
              >
                {nickname}
              </Link>
              {!isMine && (
                <>
                  <div className="size-[4px] rounded-full bg-slate-400" />
                  <button
                    className={cn(
                      'typo-body-16-bold-100-tight text-pink-500',
                      isFollowing && 'text-slate-400'
                    )}
                    onClick={onFollowClick}
                  >
                    {isFollowing ? '팔로잉' : '팔로우'}
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center text-[14px] gap-x-[10px] text-slate-500 typo-body-14-regular-100-tight [&>strong]:typo-body-14-bold-100-tight">
              <div>
                팔로워
                <strong className="ml-[2px]">{followers}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-[10px] typo-body-14-regular-150-tight truncate">
        {introduction}
      </p>
    </div>
  );
};

export default AuthorCard;
