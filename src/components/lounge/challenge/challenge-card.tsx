import Link from 'next/link';

import { SecureLink } from '@/components/common/secure-button';
import { Icon, UntitledIcon } from '@/components/icon';
import { CommonAvatar } from '@/components/ui/avatar';
import {
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '@/components/ui/card';
import Tag from '@/components/ui/tag';
import { PATH } from '@/constants/path';

interface Props {
  nickname: string;
  membershipLikes: number;
  likes: number;
  scraps: number;
  isLiked: boolean;
  isMembershipLiked: boolean;
  isScrapping: boolean;
  userId: string;
  portfolioId: string;
  studioId: string;
  profileImageUrl: string;
  portfolioImageUrl: string;
  title: string;
  onScrapClick?: () => void;
  onLikeClick?: () => void;
  onPangClick?: () => void;
  ranking?: number;
}

export default function ChallengeCard({
  profileImageUrl,
  nickname,
  membershipLikes,
  likes,
  scraps,
  isLiked,
  isMembershipLiked,
  isScrapping,
  userId,
  studioId,
  portfolioId,
  portfolioImageUrl,
  title,
  ranking,
  onLikeClick,
  onPangClick,
  onScrapClick,
}: Props) {
  const isBest = ranking === 1;
  return (
    <div className="flex flex-col gap-[16px]">
      <CardThumbnail>
        {ranking && (
          <div className="absolute z-[1] flex justify-center items-center left-[12px] top-[12px] typo-title-18-bold-100 text-white size-[36px] rounded-full bg-slate-tint-40">
            {ranking}
          </div>
        )}
        <SecureLink
          requiredLevel={'USER'}
          href={PATH.portfolioDetail(portfolioId)}
        >
          <CardThumbnailImage
            src={portfolioImageUrl}
            alt="thumbnail"
            fill
          />
        </SecureLink>
        <CardThumbnailButton onClick={onScrapClick}>
          {isScrapping ? (
            <Icon.BookmarkTonerSelect className="size-[40px]" />
          ) : (
            <Icon.BookmarkToner className="size-[40px]" />
          )}
        </CardThumbnailButton>
      </CardThumbnail>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[4px] items-center">
          <Link
            className="flex gap-[4px] items-center"
            href={PATH.studio(studioId)}
          >
            <CommonAvatar
              nickname={nickname}
              src={profileImageUrl}
            />
            <div className="typo-body-14-regular-150-tight">{nickname}</div>
          </Link>
          {isBest && (
            <Tag
              className="typo-caption-12-bold-100-tight flex items-center gap-1"
              variant="blue"
              size="sm"
            >
              <UntitledIcon.Diamond01 className="size-[14px]" />
              <span>우승작</span>
            </Tag>
          )}
        </div>
        <p className="typo-body-14-medium-100-tight">{title}</p>
        <div className="flex gap-[10px] typo-caption-12-regular-100">
          <button
            onClick={onPangClick}
            type="button"
            className="flex gap-1 items-center"
          >
            {isMembershipLiked ? <Icon.PangSelect /> : <Icon.Pang />}
            <span className="w-[36px] typo-caption-12-regular-100 text-left">
              {membershipLikes}
            </span>
          </button>
          <button
            onClick={onLikeClick}
            type="button"
            className="flex gap-1 items-center"
          >
            {isLiked ? <Icon.HeartSelect /> : <Icon.Heart />}
            <span className="w-[36px] typo-caption-12-regular-100 text-left">
              {likes}
            </span>
          </button>

          <button
            type="button"
            onClick={onScrapClick}
            className="flex gap-1 items-center"
          >
            {isScrapping ? <Icon.BookmarkSelect /> : <Icon.Bookmark />}
            <span className="w-[36px] typo-caption-12-regular-100 text-left">
              {scraps}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
