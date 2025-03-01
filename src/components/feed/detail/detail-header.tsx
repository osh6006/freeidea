'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import Inner from '@/components/common/inner';
import { CommonAvatar } from '@/components/ui/avatar';
import { PATH } from '@/constants/path';
import { useFeedDetailQuery } from '@/service/feed/use-service';
import { ChevronLeft } from '@untitled-ui/icons-react';

const FeedDetailHeader = () => {
  const { id }: { id: string } = useParams();
  const { data: feedInfo } = useFeedDetailQuery(id);

  // 뒤로가기 버튼을 위해 추가
  // Link로 할 경우 스크롤이 detail기준으로 제일 위로 스크롤 됨
  const router = useRouter();

  if (!feedInfo) {
    return null;
  }

  const { profileImageUrl, nickname, userId, studioId } = feedInfo.author;

  return (
    <header className="border-b border-slate-200 py-[25px]">
      <Inner
        maxWidth={1200}
        className="flex items-center justify-between "
      >
        <button onClick={() => router.back()}>
          <ChevronLeft
            fontSize={24}
            className="untitled-icon"
          />
        </button>
        <div className="flex-1 ">
          <div className="flex w-fit mx-auto items-center  gap-x-[10px]">
            <Link href={PATH.studio(studioId)}>
              <CommonAvatar
                nickname={nickname}
                src={profileImageUrl}
                className="size-10"
              />
            </Link>
            <span className="typo-body-16-bold-100-tight text-slate-800">
              {nickname}
            </span>
          </div>
        </div>
      </Inner>
    </header>
  );
};

export default FeedDetailHeader;
