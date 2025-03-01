import { useState } from 'react';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { UntitledIcon } from '@/components/icon';
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
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import {
  useDeleteQnaAnswerMutation,
  useToggleQnaAnswerShown,
} from '@/service/qna/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { studioQueryKey } from '@/service/studio/query-option';
import { IStudioQna } from '@/types/studio';
import { useQueryClient } from '@tanstack/react-query';

const StudioQnaOptions = ({
  qnaAnswerId,
  isMe,
}: {
  qnaAnswerId: string;
  isMe: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { rollbackQueriesData, setInfinitePageQueriesData } =
    useOptimisticUpdate();

  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useDeleteQnaAnswerMutation();

  const { mutate: toggleMutate, isPending: togglePending } =
    useToggleQnaAnswerShown();

  const { mutate: reportMutate } = useReportMutation('qnaAnswer');

  const handleDelete = () => {
    deleteMutate(qnaAnswerId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: studioQueryKey.qnaLists(),
        });
      },
    });
  };

  const handleShown = (isShown: boolean) => {
    const prevData = setInfinitePageQueriesData<IStudioQna>(
      {
        queryKey: studioQueryKey.qnaLists(),
      },
      {
        target: (item) => item.qnaAnswerId === qnaAnswerId,
        updater(item) {
          return {
            ...item,
            isShown,
          };
        },
      }
    );

    toggleMutate(
      {
        qnaAnswerId,
        body: { isShown },
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  const disabled = deleteIsPending || togglePending;

  return (
    <ReportDialog>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      >
        <DropdownMenuTrigger>
          <UntitledIcon.DotsVertical className="text-slate-300" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isMe ? (
            <>
              <DropdownMenuItem
                disabled={disabled}
                onSelect={() => handleShown(true)}
              >
                공개
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={disabled}
                onSelect={() => handleShown(false)}
              >
                비공개
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full"
                asChild
              >
                <DialogTrigger
                  disabled={disabled}
                  className="text-error w-full"
                >
                  삭제하기
                </DialogTrigger>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild>
              <DialogTrigger
                disabled={disabled}
                className="w-full"
              >
                신고하기
              </DialogTrigger>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isMe ? (
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>답을 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              답글을 삭제할 시 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-10">
            <DialogClose
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              취소
            </DialogClose>
            <DialogClose asChild>
              <button
                className={buttonVariants({})}
                onClick={handleDelete}
              >
                확인
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : (
        <ReportDialogContent
          onValidSubmit={(data) => {
            reportMutate({ id: qnaAnswerId, body: data });
          }}
        />
      )}
    </ReportDialog>
  );
};

export default StudioQnaOptions;
