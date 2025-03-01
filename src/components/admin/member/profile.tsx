import React from 'react';

import { UntitledIcon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Tag from '@/components/ui/tag';
import { getHashedColor } from '@/lib/utils';
import { IAdminMemberDetail } from '@/types/admin/member';
import { Level } from '@/types/auth';

const badge: Record<
  Exclude<Level, 'GUEST'>,
  { variant: 'yellow' | 'green' | 'blue' | 'pink' | 'gray'; label: string }
> = {
  USER: { variant: 'yellow', label: '일반' },
  AUTHOR: { variant: 'green', label: '작가' },
  ADMIN: { variant: 'blue', label: '일반관리자' },
  MASTER: { variant: 'pink', label: '최고관리자' },
} as const;

const AdminMemberDialogProfile = ({ data }: { data: IAdminMemberDetail }) => {
  const { profileImageUrl, nickname, userName, email, userLevel } = data;

  const tagVariant = badge[userLevel].variant;
  const tagLabel = badge[userLevel].label;

  return (
    <div className="flex items-center justify-between w-full ">
      <div className="flex items-center gap-x-4 divide-x">
        <Avatar className="size-20 ">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback bgColor={getHashedColor(nickname)}>
            <UntitledIcon.User03 className="size-full" />
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 px-4">
          <div className="typo-title-24-bold-tight flex items-center justify-between gap-x-2">
            {userName}

            <Tag
              className="rounded-full h-6 flex items-center justify-center"
              variant={tagVariant}
            >
              {tagLabel}
            </Tag>
          </div>
          <div className="typo-caption-12-regular-100">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberDialogProfile;
