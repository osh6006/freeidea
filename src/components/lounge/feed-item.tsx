'use client';

import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { formatRelativeDate } from '@/lib/date';
import { ILoungeFeed } from '@/types/lounge';

import { SecureLink } from '../common/secure-button';
import FeedDesc from '../feed/detail/feed-desc';
import { CardThumbnail, CardThumbnailImage } from '../ui/card';
import { Separator } from '../ui/separator';
import FeedOption from './feed-option';
import SocialActionButtons from './social-action-buttons';

interface IFeedItemProps extends ILoungeFeed {
  isLast: boolean;
}

const FeedItem = (props: IFeedItemProps) => {
  const {
    studioId,
    nickname,
    profileImageUrl,
    createdAt,
    feedId,
    userId,
    feedImageUrl,
    isLast,
    contents,
  } = props;

  return (
    <>
      <div className="flex items-center justify-between gap-x-[20px]">
        <Link href={PATH.studio(studioId)}>
          <span className="flex items-center gap-x-[14px]">
            <CommonAvatar
              nickname={nickname}
              src={profileImageUrl}
              className="size-[40px] border"
            />
            <div className="space-y-1">
              <div className="typo-body-16-medium-100-tight text-slate-800">
                {nickname}
              </div>
              <div className="typo-body-14-regular-150-tight text-slate-500">
                {formatRelativeDate(createdAt)}
              </div>
            </div>
          </span>
        </Link>

        <FeedOption
          feedId={feedId}
          userId={userId}
        />
      </div>
      <SecureLink
        requiredLevel={'USER'}
        href={`${PATH.feedDetail(feedId)}`}
      >
        <CardThumbnail className="h-[740px] overflow-hidden mt-[20px] p-0">
          <CardThumbnailImage
            src={feedImageUrl}
            alt={nickname + 'feedImage'}
            placeholder="blur"
            blurDataURL={BLUR_IMG}
            className="hover:scale-100 m-0"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </CardThumbnail>
      </SecureLink>

      <SocialActionButtons {...props} />
      <FeedDesc
        desc={contents || ''}
        isFull={false}
      />

      {!isLast && <Separator className="my-[50px]" />}
    </>
  );
};

export default FeedItem;
