import { useState } from 'react';

import SeperatorDot from '@/components/common/seperator-dot';
import { CommonAvatar } from '@/components/ui/avatar';
import { formatRelativeDate } from '@/lib/date';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { IGuestBook } from '@/types/studio';

import StudioGuestBookModify from './guest-book-modify';
import GuestBookOption from './guest-book-option';

interface GuestBookCardProps {
  data: IGuestBook;
}

const GuestBookCard = ({ data }: GuestBookCardProps) => {
  const { data: myInfo } = useMyInfoQuery();
  const [mode, setMode] = useState<'readOnly' | 'modify'>('readOnly');

  const isMe = myInfo?.userId === data.userId;

  return (
    <div className="p-[30px] border border-slate-200 rounded-[10px]">
      <div className="flex justify-between items-start">
        <span className="flex">
          <CommonAvatar
            nickname={data.nickname}
            src={data.profileImageUrl}
            className="size-[40px] border"
          />
          <span className="space-y-[6px] ml-[12px]">
            <div className="typo-body-16-bold-100-tight">{data.nickname}</div>
            <div className="typo-body-14-regular-150-tight text-slate-500 flex items-center gap-x-[6px]">
              <span>{formatRelativeDate(data.createdAt)}</span>
              <SeperatorDot />
              <span>방명록</span>
            </div>
          </span>
        </span>
        {mode === 'readOnly' && isMe && (
          <GuestBookOption
            guestBookId={data.studioVisitorId}
            setMode={setMode}
            isMe={isMe}
          />
        )}
      </div>
      {mode === 'readOnly' && (
        <>
          <p className="mt-[30px] typo-body-14-regular-150-tight">
            {data.contents}
          </p>
        </>
      )}
      {mode === 'modify' && (
        <StudioGuestBookModify
          contents={data.contents}
          setMode={setMode}
          guestBookId={data.studioVisitorId}
        />
      )}
    </div>
  );
};

export default GuestBookCard;
