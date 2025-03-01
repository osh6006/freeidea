'use client';

import { useInView } from 'react-intersection-observer';

import ScrollUpButton from '@/components/common/scroll-up-button';
import FeedSkeleton from '@/components/common/skeleton/feed-skeleton';
import Spinner from '@/components/ui/spinner';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useLoungeFeedListQuery } from '@/service/lounge/use-service';

import EmptyFeed from '../empty-feed';
import FeedItem from '../feed-item';

const LoungeFeedList = () => {
  const {
    data: feedData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useLoungeFeedListQuery();

  const { data: myInfo } = useMyInfoQuery();

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  if (isLoading)
    return (
      <ul className="max-w-[720px] grid grid-cols-1 mx-auto space-y-5">
        {[1, 2].map((el) => (
          <FeedSkeleton key={el} />
        ))}
      </ul>
    );

  if (!feedData) return null;

  const feedList = feedData.flattenData;
  const count = feedData.flattenData.length - 1;

  return (
    <>
      {feedList.length > 0 ? (
        <ul className="max-w-[720px] grid grid-cols-1 mx-auto">
          {feedList?.map((feed, i) => (
            <li key={feed.feedId}>
              <FeedItem
                {...feed}
                isLast={i === count}
              />
            </li>
          ))}

          {isRefetching && (
            <div className="w-full flex items-center justify-center ">
              <Spinner />
            </div>
          )}
          <div ref={ref} />
        </ul>
      ) : (
        <EmptyFeed level={myInfo?.userLevel || 'GUEST'} />
      )}
      <ScrollUpButton />
    </>
  );
};

export default LoungeFeedList;
