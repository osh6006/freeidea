import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import Spinner from '@/components/ui/spinner';
import {
  useStudioNoticeListQuery,
  useStudioProfileQuery,
} from '@/service/studio/use-service';

import BoardEmpty from '../board-empty';
import StudioNotiCard from './noti-card';

const BoardNotiList = () => {
  const params = useParams<{ id: string }>();

  const { data: profileInfo, isLoading: profileLoading } =
    useStudioProfileQuery(params.id);

  const {
    data: notiData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
  } = useStudioNoticeListQuery(params.id, {});

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (isLoading || profileLoading) return null;
  if (!notiData) return null;

  const { list } = notiData;

  return (
    <>
      {list.length > 0 ? (
        <>
          <ul className="space-y-[20px]">
            {profileInfo &&
              list &&
              list.reverse().map((notice) => {
                return (
                  <li
                    className="flex flex-col border border-slate-200 p-[20px] rounded-[10px]"
                    key={notice.studioNoticeId}
                  >
                    <StudioNotiCard
                      noticeData={notice}
                      profileData={profileInfo}
                    />
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <BoardEmpty>아직 추가된 공지사항이 없어요</BoardEmpty>
      )}

      {isRefetching && (
        <div className="w-full flex items-center justify-center mt-[40px]">
          <Spinner className="size-[40px]" />
        </div>
      )}
      <div ref={ref}></div>
    </>
  );
};

export default BoardNotiList;
