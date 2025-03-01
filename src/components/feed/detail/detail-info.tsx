'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import SeperatorDot from '@/components/common/seperator-dot';
import { formatRelativeDate } from '@/lib/date';
import { cn, formatSocialNumber } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useFeedDetailQuery } from '@/service/feed/use-service';
import { useReportMutation } from '@/service/report/use-service';

const FeedDetailInfo = () => {
  const { id }: { id: string } = useParams();
  const { data: feedInfo } = useFeedDetailQuery(id);
  const { mutate } = useReportMutation('feed');

  const [open, setOpen] = useState(false);
  const { data: myInfo } = useMyInfoQuery();

  if (!feedInfo) {
    return null;
  }

  const { createdAt, viewCount, membershipLikes, likes, comments, scraps } =
    feedInfo;

  const isMe = feedInfo.author.userId === myInfo?.userId;

  return (
    <div
      className={cn(
        'flex items-center justify-between text-slate-500 typo-body-14-regular-150 mt-[33.5px]'
      )}
    >
      <span className="flex items-center gap-x-[6px]">
        <span>{formatRelativeDate(createdAt)}</span>
        <SeperatorDot />
        <span>팡 {formatSocialNumber(membershipLikes)}</span>
        <SeperatorDot />
        <span>좋아요 {formatSocialNumber(likes)}</span>
        <SeperatorDot />
        <span>댓글 {formatSocialNumber(comments)}</span>
        <SeperatorDot />
        <span>스크랩 {formatSocialNumber(scraps)}</span>
        <SeperatorDot />
        <span>조회 {formatSocialNumber(viewCount)}</span>
      </span>

      {!isMe ? (
        <>
          <span>
            <button
              onClick={() => setOpen(true)}
              className="text-slate-500 typo-body-16-medium-100-tight"
            >
              신고하기
            </button>
          </span>
          <ReportDialog
            open={open}
            onOpenChange={setOpen}
          >
            <ReportDialogContent
              onValidSubmit={(data) => mutate({ id, body: data })}
            />
          </ReportDialog>
        </>
      ) : null}
    </div>
  );
};

export default FeedDetailInfo;
