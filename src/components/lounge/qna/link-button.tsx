'use client';

import React from 'react';

import { SecureLink } from '@/components/common/secure-button';
import { PATH } from '@/constants/path';
import { Pencil02 } from '@untitled-ui/icons-react';

const QnaWriteLinkButton = () => {
  return (
    <div className="flex w-full sticky bottom-[60px] right-0 justify-end">
      <SecureLink
        requiredLevel="USER"
        href={PATH.loungeQnaWrite}
      >
        <div className="size-[100px] bg-primary flex flex-col gap-y-[6px] items-center justify-center rounded-full text-white typo-body-16-medium-100-tight  ">
          <Pencil02 />
          질문하기
        </div>
      </SecureLink>
    </div>
  );
};

export default QnaWriteLinkButton;
