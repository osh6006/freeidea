'use client';

import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { PATH } from '@/constants/path';
import { SECOND } from '@/constants/time';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { studioQueryKey } from '@/service/studio/query-option';
import {
  useFollowAuthorMutation,
  useStudioProfilePopupQuery,
} from '@/service/studio/use-service';
import { IStudioProfilePopup } from '@/types/studio';
import { HoverCardPortal } from '@radix-ui/react-hover-card';

import { CardThumbnail, CardThumbnailImage } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import ImageWithFallback from './image-with-fallback';
import { SecureLink } from './secure-button';
import SeperatorDot from './seperator-dot';

interface IProfileHoverCardProps {
  profileUrl: string;
  studioId: string;
  size: number;
  nickname: string;
  className?: string;
}

const ProfileHoverCard = ({
  profileUrl,
  studioId,
  size,
  nickname,
  className,
}: IProfileHoverCardProps) => {
  return (
    <HoverCard openDelay={0.1 * SECOND}>
      <HoverCardTrigger
        className="cursor-pointer"
        asChild
      >
        <Link href={PATH.studio(studioId)}>
          <CommonAvatar
            nickname={nickname}
            src={profileUrl}
            style={{ width: size, height: size }}
            className={className}
          />
        </Link>
      </HoverCardTrigger>
      <HoverCardPortal>
        <ProfileHoverContent studioId={studioId} />
      </HoverCardPortal>
    </HoverCard>
  );
};

function ProfileHoverContent({ studioId }: { studioId: string }) {
  const { data } = useStudioProfilePopupQuery(studioId);
  const { data: myInfo } = useMyInfoQuery();

  const { mutate } = useFollowAuthorMutation();

  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  const handleAuthorFollow = (isFollowing?: boolean) => {
    if (isFollowing === undefined) return;

    const prevData = setQueriesData<IStudioProfilePopup>(
      {
        queryKey: studioQueryKey.profilePopup(studioId),
      },
      (oldData) => ({
        ...oldData,
        isFollowing: !isFollowing,
      })
    );
    mutate(
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

  const isMe = data?.studioId === myInfo?.studioId;

  return (
    <HoverCardContent className="w-80 p-0 overflow-hidden rounded-[10px] bg-white">
      <div className="h-[140px] relative">
        <div className="h-full rounded-b-none border-none">
          <ImageWithFallback
            fallback={<div className="size-full bg-slate-50" />}
            sizes="100vw"
            fill
            src={data?.titleImageUrl}
            style={{
              objectFit: 'cover',
            }}
            alt="profile-background"
          />
        </div>

        <CommonAvatar
          className="absolute left-[20px] -bottom-[32px] size-[64px] border border-white"
          nickname={data?.nickname}
          src={data?.profileImageUrl}
        />
      </div>
      <div className="px-[20px] mt-[42px]">
        <div className="flex items-center gap-x-[6px] text-[18px]">
          <Link href={PATH.studio(data?.studioId || '')}>
            <span className="font-bold text-slate-800">{data?.nickname}</span>
          </Link>
          <SeperatorDot />
          {!isMe && (
            <button
              className={cn(
                'font-bold ',
                data?.isFollowing ? 'text-slate-400' : 'text-primary'
              )}
              onClick={() => handleAuthorFollow(data?.isFollowing)}
            >
              {data?.isFollowing ? '팔로잉' : '팔로우'}
            </button>
          )}
        </div>
        <p className="mt-[20px] text-slate-500">{data?.introduction}</p>
      </div>
      <ul className="m-[20px] grid grid-cols-3 gap-x-[5px]">
        {data?.portfolio ? (
          data.portfolio.map((el, i) => (
            <li
              key={el.portfolioId}
              className="relative h-[90px] rounded-sm aspect-square overflow-hidden"
            >
              <SecureLink
                requiredLevel={'USER'}
                href={PATH.portfolioDetail(el.portfolioId)}
              >
                <CardThumbnail>
                  <CardThumbnailImage
                    fill
                    alt={'author-image' + i}
                    src={el.portfolioImageUrl}
                  />
                </CardThumbnail>
              </SecureLink>
            </li>
          ))
        ) : (
          <>
            <li className="h-[90px] rounded-sm aspect-square overflow-hidden">
              <Skeleton className="size-full" />
            </li>
            <li className="h-[90px] rounded-sm aspect-square overflow-hidden">
              <Skeleton className="size-full" />
            </li>
            <li className="h-[90px] rounded-sm aspect-square overflow-hidden">
              <Skeleton className="size-full" />
            </li>
          </>
        )}
      </ul>
    </HoverCardContent>
  );
}
export default ProfileHoverCard;
