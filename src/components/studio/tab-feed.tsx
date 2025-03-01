'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import TabEmpty from '@/components/studio/tab-empty';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useFeedListQuery } from '@/service/feed/use-service';
import { useStudioProfileQuery } from '@/service/studio/use-service';

import ScrollUpButton from '../common/scroll-up-button';
import FeedSkeleton from '../common/skeleton/feed-skeleton';
import FeedItem from '../lounge/feed-item';
import Spinner from '../ui/spinner';

const TabFeed = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const { data: studioInfo } = useStudioProfileQuery(id);
  const {
    data: feedData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFeedListQuery(studioInfo?.studioId || '', {
    limit: 2,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const feedList = feedData?.flattenList || [];
  const isMe = id === myInfo?.studioId;

  const isLength = feedList.length > 0;

  return (
    <>
      <ul className="max-w-[720px] grid grid-cols-1 mx-auto">
        {isLoading ? (
          <>
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        ) : (
          <>
            {feedList.map((feed, i) => (
              <li key={feed.feedId}>
                <FeedItem
                  {...feed}
                  userId={studioInfo?.userId || ''}
                  isLast={i === feedList.length - 1}
                />
              </li>
            ))}
          </>
        )}
        {isRefetching && (
          <div className="w-full flex items-center justify-center ">
            <Spinner />
          </div>
        )}
        <div ref={ref} />
      </ul>

      {!isLoading && !isLength && (
        <div className="flex items-center justify-center w-full ">
          <TabEmpty
            title="등록된 피드가 없어요"
            buttonTitle="피드 등록하러 가기"
            isFeed
            isMe={isMe}
          />
        </div>
      )}
    </>
  );
};

export default TabFeed;
