'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { PATH } from '@/constants/path';
import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useRequestDetailQuery } from '@/service/request/use-service';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent, useEditor } from '@tiptap/react';
import { Eye } from '@untitled-ui/icons-react';

import { CommonAvatar } from '../ui/avatar';
import RequestReportDropdown from './report-dropdown';
import RequestOptDropdown from './request-opt-dropdown';

const ContentsLeft = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();

  const { data } = useRequestDetailQuery(id);

  const editor = useEditor({
    content: data?.contents || '',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  if (!data) {
    return null;
  }
  const {
    userId,
    title,
    inquiryId,
    viewCount,
    profileImageUrl,
    nickname,
    studioId,
  } = data;

  const isMe = myInfo?.userId === userId;

  return (
    <div className="flex flex-col max-w-[730px] gap-[30px] whitespace-nowrap">
      <div className="flex flex-col border w-[730px] gap-[20px] border-t-transparent border-l-transparent border-r-transparent">
        <div className="flex justify-between items-center">
          <div className="text-slate-800 text-[26px] font-[700]">{title}</div>

          {isMe && <RequestOptDropdown id={inquiryId} />}
          {!isMe && <RequestReportDropdown id={inquiryId} />}
        </div>
        <div className="flex gap-[4px]">
          <Eye
            className="untitled-icon text-slate-500"
            width={20}
            height={20}
          />
          <div className="flex items-center gap-[6px]">
            <span className="text-[12px] text-slate-500 font-[400]">
              조회수
            </span>
            <span className="text-[12px] text-slate-500 font-[700]">
              {viewCount}
            </span>
          </div>
        </div>
        <Link
          href={PATH.studio(studioId)}
          className="w-fit"
        >
          <div className="flex gap-[12px] items-center">
            <CommonAvatar
              className="w-[40px] h-[40px]"
              src={profileImageUrl}
              nickname={nickname}
            />
            <div className="text-[14px] font-[700] text-slate-800">
              {nickname}
            </div>
          </div>
        </Link>

        <div className="w-fit text-[16px] font-[700] pt-[10px] pb-[12px] border-slate-800 border-b-[4px]">
          요청사항
        </div>
      </div>
      <div className="max-w-[730px] text-[14px] font-[400]">
        <EditorContent
          editor={editor}
          className={cn(COMMON_MARKDOWN_STYLE)}
        />
      </div>
    </div>
  );
};

export default ContentsLeft;
