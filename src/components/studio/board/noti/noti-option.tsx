import { useState } from 'react';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReportMutation } from '@/service/report/use-service';
import { useStudioNoticeDeleteMustaion } from '@/service/studio/use-service';
import { DotsVertical } from '@untitled-ui/icons-react';

const StudioNotiOption = ({
  setMode,
  noticeId,
  studioId,
  isMe,
}: {
  setMode: (mode: 'modify' | 'readOnly') => void;
  noticeId: string;
  studioId: string;
  isMe: boolean;
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const { mutate, isPending } = useStudioNoticeDeleteMustaion(
    studioId,
    noticeId
  );

  const { mutate: reportMutate } = useReportMutation('studioNotice');

  return (
    <>
      <Dialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">
              공지를 삭제하시겠습니까?
            </DialogTitle>
            <DialogDescription className="text-left">
              공지 삭제 시 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-[30px]">
            <DialogClose
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              취소
            </DialogClose>
            <DialogClose
              className={buttonVariants({})}
              onClick={() => {
                mutate();
              }}
            >
              확인
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ReportDialog>
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={setDropDownOpen}
        >
          <DropdownMenuTrigger>
            <DotsVertical className="text-slate-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isMe ? (
              <>
                <DropdownMenuItem
                  disabled={isPending}
                  onSelect={() => setMode('modify')}
                >
                  수정하기
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={isPending}
                  className="text-destructive"
                  onSelect={() => {
                    setDropDownOpen(false);
                    setAlertOpen(true);
                  }}
                >
                  삭제하기
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  asChild
                  disabled={isPending}
                >
                  <DialogTrigger className="w-full">신고하기</DialogTrigger>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ReportDialogContent
          onValidSubmit={(data) => {
            reportMutate({ id: noticeId, body: data });
          }}
        />
      </ReportDialog>
    </>
  );
};

export default StudioNotiOption;
