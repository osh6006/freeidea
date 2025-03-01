import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import GuestBookSkeleton from '@/components/common/skeleton/guest-book-skeleton';
import Spinner from '@/components/ui/spinner';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useStudioGuestBookListQuery,
  useStudioProfileQuery,
} from '@/service/studio/use-service';

import BoardEmpty from '../board-empty';
import GuestBookCard from './guest-book-card';
import StudioGuestBookWrite from './guest-book-write';

const BoardGuestBook = () => {
  const params = useParams<{ id: string }>();
  const { data: myInfo } = useMyInfoQuery();
  const { data: profileInfo } = useStudioProfileQuery(params.id);

  const isMe = myInfo?.userId === profileInfo?.userId;

  const {
    data: guestBookData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useStudioGuestBookListQuery(params.id, {});

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  const isLength = guestBookData?.list.length || 0 > 0;

  return (
    <>
      {!isMe && myInfo?.userId && <StudioGuestBookWrite />}
      <ul className="w-full flex flex-col gap-y-[20px] ">
        {isLoading ? (
          <>
            <GuestBookSkeleton />
            <GuestBookSkeleton />
          </>
        ) : (
          <>
            {guestBookData?.list.map((guestbook) => (
              <li key={guestbook.studioVisitorId}>
                <GuestBookCard data={guestbook} />
              </li>
            ))}
          </>
        )}

        {!isLength && !isLoading && (
          <BoardEmpty>첫 방명록을 남겨보세요!</BoardEmpty>
        )}
      </ul>

      {isRefetching && (
        <div className="w-full flex items-center justify-center mt-[40px]">
          <Spinner className="size-[40px]" />
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default BoardGuestBook;
