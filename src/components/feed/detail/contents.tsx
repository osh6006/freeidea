'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import Inner from '@/components/common/inner';
import SocialActionButtons from '@/components/lounge/social-action-buttons';
import { Separator } from '@/components/ui/separator';
import { useFeedDetailQuery } from '@/service/feed/use-service';

import FeedDetailInfo from './detail-info';
import FeedCarousel from './feed-carousel';
import FeedComments from './feed-comments';
import FeedDesc from './feed-desc';
import FeedProfile from './feed-profile';
import FeedTagCarousel from './feed-tag-carousel';
import FeedDetailOptions from './options';

const FeedDetailContents = () => {
  const { id }: { id: string } = useParams();
  const { data: feedInfo } = useFeedDetailQuery(id);

  return (
    <>
      <Inner
        maxWidth={720}
        className="w-full mx-auto mb-[200px] mt-[50px]"
      >
        <FeedDetailOptions />
        <FeedCarousel />
        {feedInfo && <SocialActionButtons {...feedInfo} />}
        <FeedDesc desc={feedInfo?.contents || ''} />
        <FeedTagCarousel />
        <FeedDetailInfo />
        <Separator className="mt-[30px]" />
        <FeedProfile />
        <FeedComments />
      </Inner>
    </>
  );
};

export default FeedDetailContents;
