'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import SeperatorDot from '@/components/common/seperator-dot';
import { CommonAvatar } from '@/components/ui/avatar';
import { formatRelativeDate } from '@/lib/date';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useStudioNoticeFixMutation,
  useStudioProfileQuery,
} from '@/service/studio/use-service';
import { IStudioNotice, IStudioProfile } from '@/types/studio';
import { Pin02 } from '@untitled-ui/icons-react';

import StudioNotiModify from './noti-modify';
import StudioNotiOption from './noti-option';

interface IStudioNotiCardProps {
  profileData: IStudioProfile;
  noticeData: IStudioNotice;
}

const StudioNotiCard = ({ noticeData, profileData }: IStudioNotiCardProps) => {
  const [mode, setMode] = useState<'readOnly' | 'modify'>('readOnly');

  const params = useParams<{ id: string }>();
  const { data: myInfo } = useMyInfoQuery();
  const { data: profileInfo } = useStudioProfileQuery(params.id);

  const isMe = myInfo?.userId === profileInfo?.userId;

  const { mutate } = useStudioNoticeFixMutation();

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <span className="flex">
          <CommonAvatar
            nickname={profileData.nickname}
            src={profileData.profileImageUrl}
            className="size-[40px] border"
          />
          <span className="space-y-[6px] ml-[12px]">
            <div className="typo-body-16-bold-100-tight">
              {profileData.nickname}
            </div>
            <div className="typo-body-14-regular-150-tight text-slate-500 flex items-center gap-x-[6px]">
              {formatRelativeDate(noticeData.createdAt)}
              <SeperatorDot />
              공지
            </div>
          </span>
        </span>

        <span className="flex gap-x-2">
          <button
            type="button"
            onClick={() => {
              mutate({
                noticeId: noticeData.studioNoticeId,
                isFixed: noticeData.isFixed,
              });
            }}
          >
            <Pin02
              width={20}
              height={20}
              className={noticeData.isFixed ? 'text-primary' : 'text-slate-300'}
              fill={noticeData.isFixed ? '#FF96B5' : 'none'}
            />
          </button>
          {mode === 'readOnly' && (
            <StudioNotiOption
              noticeId={noticeData.studioNoticeId}
              studioId={params.id}
              setMode={setMode}
              isMe={isMe}
            />
          )}
        </span>
      </div>
      {mode === 'readOnly' ? (
        <div className="mt-[34px] typo-body-14-regular-150-tight">
          {noticeData.contents}
        </div>
      ) : (
        <StudioNotiModify
          contents={noticeData.contents}
          isFixed={noticeData.isFixed}
          noticeId={noticeData.studioNoticeId}
          setMode={setMode}
        />
      )}
    </>
  );
};

export default StudioNotiCard;
