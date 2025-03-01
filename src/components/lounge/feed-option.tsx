'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useDeleteFeedMutation } from '@/service/feed/use-service';
import { useReportMutation } from '@/service/report/use-service';

import GlobalAlertDialog from '../common/global-alert-dialog';
import FeedWriteDialog from '../feed/write/dialog';
import { UntitledIcon } from '../icon';
import { DialogTrigger } from '../ui/dialog';

const FeedOption = ({
  feedId,
  userId,
}: {
  feedId: string;
  userId?: string;
}) => {
  const { toast } = useToast();
  const { data } = useMyInfoQuery();

  const { mutate, isPending } = useDeleteFeedMutation(feedId);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const isMe = data?.userId === userId;

  const { mutate: reportMutate } = useReportMutation('feed');

  const handleShare = () => {
    const url = window.location.host;
    navigator.clipboard
      .writeText(`${url}${PATH.feedDetail(feedId)}`)
      .then(() => {
        toast({
          description: 'URL이 복사되었습니다!',
        });
      });
  };
  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      >
        <DropdownMenuTrigger asChild>
          <button onClick={() => setDropdownOpen(true)}>
            <UntitledIcon.DotsVertical className="text-slate-300" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isMe ? (
            <>
              <ReportDialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive w-full"
                  >
                    신고
                  </DropdownMenuItem>
                </DialogTrigger>
                <ReportDialogContent
                  onValidSubmit={(data) => {
                    reportMutate({ id: feedId || '', body: data });
                  }}
                />
              </ReportDialog>
              <DropdownMenuItem onSelect={handleShare}>
                공유하기
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                disabled={isPending}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <FeedWriteDialog feedId={feedId}>
                  <div className="text-start">수정하기</div>
                </FeedWriteDialog>
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={isPending}
                className="text-error"
                onSelect={() => {
                  setDropdownOpen(false);
                  setDeleteAlertOpen(true);
                }}
              >
                삭제하기
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <GlobalAlertDialog
        isOpen={deleteAlertOpen}
        setIsOpen={setDeleteAlertOpen}
        title="글을 삭제하시겠습니까?"
        desc="글을 삭제할 시 되돌릴 수 없습니다."
        disabled={isPending}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default FeedOption;
