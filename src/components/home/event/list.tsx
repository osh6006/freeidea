'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import { Card, CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { PATH } from '@/constants/path';
import { useEventListQuery } from '@/service/home/use-service';

const EventList = () => {
  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useEventListQuery({ limit: 10 });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  const { flattenList } = data;

  return (
    <ul className="grid grid-cols-2 gap-x-[30px] gap-y-[40px]">
      {flattenList.map(({ eventId, thumbnailImageUrl, title, description }) => (
        <Card key={eventId}>
          <Link href={PATH.eventDetail(eventId)}>
            <CardThumbnail className="h-[150px] rounded-[8px]">
              <CardThumbnailImage
                fill
                src={thumbnailImageUrl}
                alt="이미지"
              />
            </CardThumbnail>
            <h3 className="mt-[20px] typo-title-28-bold-100 text-slate-800 line-clamp-1">
              {title}
            </h3>
            <p className="mt-[10px] w-1/2 typo-body-14-regular-150-tight text-slate-600 line-clamp-3">
              {description}
            </p>
          </Link>
        </Card>
      ))}
      {isRefetching && (
        <div className="w-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </ul>
  );
};

export default EventList;
