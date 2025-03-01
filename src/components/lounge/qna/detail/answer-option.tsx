import { useState } from 'react';

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
import { qnaQueryKey } from '@/service/qna/query-option';
import {
  useDeleteQnaAnswerMutation,
  useToggleQnaAnswerShown,
} from '@/service/qna/use-service';
import { IQnaAnswer } from '@/types/qna';

const QnaAnswerOption = ({
  qnaAnswerId,
  isShown,
}: {
  qnaAnswerId: string;
  isShown: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mutate, isPending } = useDeleteQnaAnswerMutation();

  const { rollbackQueriesData, setInfinitePageQueriesData } =
    useOptimisticUpdate();

  const handleDelete = () => {
    mutate(qnaAnswerId);
  };

  const { mutate: toggleMutate, isPending: togglePending } =
    useToggleQnaAnswerShown();

  const handleShown = (isShown: boolean) => {
    const prevData = setInfinitePageQueriesData<IQnaAnswer>(
      {
        queryKey: qnaQueryKey.lists(),
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

  const disabled = togglePending || isPending;

  return (
    <Dialog>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      >
        <DropdownMenuTrigger asChild>
          <button
            disabled={disabled}
            onClick={() => setDropdownOpen(true)}
          >
            <UntitledIcon.DotsVertical className="text-slate-300" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isShown ? (
            <DropdownMenuItem
              disabled={disabled}
              className="w-full "
              onSelect={() => handleShown(false)}
            >
              비공개
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled={disabled}
              className="w-full "
              onSelect={() => handleShown(true)}
            >
              공개
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            disabled={disabled}
            asChild
          >
            <DialogTrigger className="text-error w-full">
              삭제하기
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>정말로 답글을 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            답글 삭제 시 되돌릴 수 없습니다.
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
    </Dialog>
  );
};

export default QnaAnswerOption;
