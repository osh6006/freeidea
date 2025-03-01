'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import SeperatorDot from '@/components/common/seperator-dot';
import { CommonAvatar } from '@/components/ui/avatar';
import { formatRelativeDate } from '@/lib/date';
import {
  useStudioNoticeQuery,
  useStudioProfileQuery,
} from '@/service/studio/use-service';
import { faker } from '@faker-js/faker';
import { Pin02 } from '@untitled-ui/icons-react';

const HomeNotification = () => {
  const { id }: { id: string } = useParams();
  const { data: profileInfo } = useStudioProfileQuery(id);
  const { data: noticeInfo } = useStudioNoticeQuery(id);

  if (!noticeInfo?.contents) return null;

  return (
    <div className="relative p-[30px] border border-slate-200 rounded-[10px]">
      <Image
        width={16}
        height={18}
        alt="icon"
        src="/icons/notification/noti-bookmark.svg"
        className="absolute top-0"
      />
      <div className="flex justify-between">
        <span className="flex">
          <CommonAvatar
            nickname={profileInfo?.nickname}
            src={profileInfo?.profileImageUrl}
            className="size-10 border"
          />

          <span className="space-y-[6px] ml-[12px]">
            <div className="typo-body-16-bold-100-tight">
              {profileInfo?.nickname}
            </div>
            <div className="typo-body-14-regular-150-tight text-slate-500 flex items-center gap-x-[6px]">
              <span>
                {formatRelativeDate(noticeInfo?.createdAt || new Date())}
              </span>
              <SeperatorDot />
              <span>공지</span>
            </div>
          </span>
        </span>
        <span>
          <Pin02
            width={20}
            height={20}
            className="text-primary"
            fill="#FF96B5"
          />
        </span>
      </div>
      <div className="mt-[34px]">
        {noticeInfo?.contents
          .split('\n')
          .map((sentence) => <p key={faker.string.uuid()}>{sentence}</p>)}
      </div>
    </div>
  );
};

export default HomeNotification;
