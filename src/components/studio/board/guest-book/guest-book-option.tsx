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
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReportMutation } from '@/service/report/use-service';
import { useDeleteGuestBookMutation } from '@/service/studio/use-service';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DotsVertical } from '@untitled-ui/icons-react';

const GuestBookOption = ({
  setMode,
  guestBookId,
  isMe,
}: {
  setMode: (mode: 'modify' | 'readOnly') => void;
  guestBookId: string;
  isMe: boolean;
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const { mutate } = useDeleteGuestBookMutation();

  const { mutate: reportMutate, isPending } =
    useReportMutation('studioGuestbook');

  return (
    <>
      <Dialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">
              방명록을 삭제하시겠습니까?
            </DialogTitle>
            <DialogDescription className="text-left">
              방명록 삭제 시 되돌릴 수 없습니다.
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
                mutate({ guestBookId });
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
                  onSelect={() => {
                    setMode('modify');
                  }}
                >
                  수정하기
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  disabled={isPending}
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
                  disabled={isPending}
                  asChild
                  className="w-full"
                >
                  <DialogTrigger>신고하기</DialogTrigger>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ReportDialogContent
          onValidSubmit={(data) => {
            reportMutate({ id: guestBookId, body: data });
          }}
        />
      </ReportDialog>
    </>
  );
};

export default GuestBookOption;
