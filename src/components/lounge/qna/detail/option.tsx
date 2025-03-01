import { useState } from 'react';

import { useRouter } from 'next/navigation';

import GlobalAlertDialog from '@/components/common/global-alert-dialog';
import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { UntitledIcon } from '@/components/icon';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/path';
import { useDeleteQnaMutation } from '@/service/qna/use-service';
import { useReportMutation } from '@/service/report/use-service';

const QnaDetailOption = ({ qnaId, isMe }: { qnaId: string; isMe: boolean }) => {
  const router = useRouter();

  const [alertOpen, setAlertOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useDeleteQnaMutation();

  const handleDelete = () => {
    deleteMutate(qnaId, {
      onSuccess: () => {
        setAlertOpen(false);
      },
    });
  };

  const disabled = deleteIsPending;

  const { mutate: reportMutate } = useReportMutation('qna');

  return (
    <div>
      <ReportDialog>
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
            {isMe ? (
              <>
                <DropdownMenuItem
                  disabled={disabled}
                  onSelect={() => {
                    router.push(`${PATH.loungeQnaWrite}?id=${qnaId}`);
                  }}
                >
                  수정하기
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setDropdownOpen(false);
                    setAlertOpen(true);
                  }}
                  disabled={disabled}
                  className="text-error"
                >
                  삭제하기
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
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
            reportMutate({ id: qnaId, body: data });
          }}
        />
      </ReportDialog>
      <GlobalAlertDialog
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
        title="글을 삭제하시겠습니까?"
        desc="글을 삭제할 시 되돌릴 수 없습니다."
        disabled={disabled}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default QnaDetailOption;
