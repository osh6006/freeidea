'use client';

import { useParams } from 'next/navigation';

import { UntitledIcon } from '@/components/icon';
import { CommonAvatar } from '@/components/ui/avatar';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useRequestDetailQuery } from '@/service/request/use-service';

import RequestMobileOption from './option';

const RequestDetailMobileProfile = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const { data } = useRequestDetailQuery(id);

  if (!data) {
    return null;
  }

  const { userId, title, inquiryId, viewCount, profileImageUrl, nickname } =
    data;
  const isMe = myInfo?.userId === userId;

  return (
    <header className="mt-6 space-y-3 pc-screen:hidden">
      <div className="flex items-center justify-between">
        <h1 className="typo-title-20-bold-100-tight">{title}</h1>
        <RequestMobileOption
          id={inquiryId}
          isMe={isMe}
        />
      </div>
      <div className="flex items-center typo-body-14-bold-100-tight gap-x-2">
        <CommonAvatar
          src={profileImageUrl}
          nickname={nickname}
          className="size-8"
        />
        <span>{nickname}</span>
      </div>
      <div className="flex items-center gap-x-1 typo-caption-12-regular-100 text-slate-500">
        <UntitledIcon.Eye className="size-5" />
        <span>조회수</span>
        <span className="font-bold">{viewCount}</span>
      </div>
    </header>
  );
};

export default RequestDetailMobileProfile;
