import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';

import { PATH } from '@/constants/path';
import { formatCreatedTimeDate } from '@/lib/date';
import { ReportSchemaType } from '@/lib/zod/request/report-schema';

import { CommonAvatar } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ReportDialog, ReportDialogContent } from './report-dialog';

export default function Review({
  profileImageUrl,
  nickname,
  createdAt,
  content,
  isMine = false,
  studioId,
  onReportValidSubmit,
  onReportInvalidSubmit,
  onDeleteClick,
}: {
  profileImageUrl: string;
  nickname: string;
  createdAt: string;
  content: string;
  studioId: string;
  isMine?: boolean;
  onReportValidSubmit?: SubmitHandler<ReportSchemaType>;
  onReportInvalidSubmit?: SubmitErrorHandler<ReportSchemaType>;
  onDeleteClick?: () => void;
}) {
  const formattedCreatedAt = formatCreatedTimeDate(new Date(createdAt));
  return (
    <div className="py-[30px] flex flex-col gap-[10px]">
      <p className="typo-body-14-regular-150-tight text-slate-600 whitespace-pre-line">
        {content}
      </p>
      <div className="flex items-center gap-[10px] typo-body-14-regular-150-tight text-slate-500">
        <Link
          href={PATH.studio(studioId)}
          className="flex items-center gap-[4px]"
        >
          <CommonAvatar
            nickname={nickname}
            src={profileImageUrl}
            className="size-[24px]"
          />
          <span className="typo-body-14-regular-150-tight text-slate-500">
            {nickname}
          </span>
        </Link>
        <div className="size-[4px] rounded-full bg-slate-200" />
        <time>{formattedCreatedAt}</time>
        <div className="size-[4px] rounded-full bg-slate-200" />

        {isMine ? (
          <Dialog>
            <DialogTrigger>삭제</DialogTrigger>

            <DialogContent>
              <DialogHeader className="text-left">
                <DialogTitle>댓글을 삭제하시겠습니까?</DialogTitle>
                <DialogDescription>
                  댓글 삭제 시 되돌릴 수 없습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">취소</Button>
                </DialogClose>
                <DialogClose onClick={onDeleteClick}>
                  <Button>확인</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <ReportDialog>
            <DialogTrigger>신고</DialogTrigger>
            <ReportDialogContent
              onValidSubmit={onReportValidSubmit}
              onInvalidSubmit={onReportInvalidSubmit}
            />
          </ReportDialog>
        )}
      </div>
    </div>
  );
}
