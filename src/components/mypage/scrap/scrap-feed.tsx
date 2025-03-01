'use client';

import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import { Icon } from '@/components/icon';
import {
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '@/components/ui/card';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useToggleFeedScrapMutation } from '@/service/feed/use-service';
import { myScrapFeedQueryKey } from '@/service/mypage/query-option';
import { useMyScrapFeedListQuery } from '@/service/mypage/use-service';
import { Feed } from '@/types/mypage';

import { ScrapEmpty } from './scrap-empty';

const ScrapFeed = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMyScrapFeedListQuery();

  const { mutate } = useToggleFeedScrapMutation();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const { ref } = useInView({
    onChange: (inView) => {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (!data) return null;

  const feedList = data.flattenList;

  const onScrapClick = (feedId: string, isScrapping: boolean) => {
    const prevData = setInfinitePageQueriesData<Feed>(
      {
        queryKey: myScrapFeedQueryKey.lists(),
      },
      {
        target: (item) => item.feedId === feedId,
        updater: (item) => ({ ...item, isScrapping }),
      }
    );

    mutate(
      { feedId, isScrap: isScrapping },
      {
        onError: () => rollbackQueriesData(prevData),
      }
    );
  };

  return (
    <>
      {feedList.length === 0 ? (
        <ScrapEmpty />
      ) : (
        <ul className="grid grid-cols-3 mt-[20px] gap-[20px] mb-[220px]">
          {feedList.map(({ feedId, feedImageUrl, isScrapping }, i) => {
            return (
              <li key={feedId}>
                <CardThumbnail>
                  <Link href={PATH.feedDetail(feedId)}>
                    <CardThumbnailImage
                      src={feedImageUrl}
                      alt={`feed-${i}`}
                      fill
                    />
                  </Link>
                  <CardThumbnailButton
                    onClick={() => onScrapClick(feedId, !isScrapping)}
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
          })}
          <div ref={ref} />
        </ul>
      )}
    </>
  );
};

export default ScrapFeed;
