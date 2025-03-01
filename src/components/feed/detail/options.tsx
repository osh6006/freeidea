'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

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
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useDeleteFeedMutation,
  useFeedDetailQuery,
} from '@/service/feed/use-service';

import FeedWriteDialog from '../write/dialog';

const FeedDetailOptions = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const { data: feedInfo } = useFeedDetailQuery(id);

  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { mutate, isPending } = useDeleteFeedMutation(id);

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  const isMe = myInfo?.userId === feedInfo?.author.userId;

  if (!isMe) return null;

  return (
    <div className="flex w-full justify-end mb-[6px]">
      <Dialog>
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
        >
          <DropdownMenuTrigger>
            <UntitledIcon.DotsHorizontal className="text-slate-800" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={isPending}
              onSelect={(e) => e.preventDefault()}
            >
              <FeedWriteDialog feedId={id}>
                <div className="text-start">수정하기</div>
              </FeedWriteDialog>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <DialogTrigger
                disabled={isPending}
                className="w-full text-error cursor-pointer"
              >
                삭제하기
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>글을 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              글을 삭제할 시 되돌릴 수 없습니다.
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
            <DialogClose
              onClick={handleDelete}
              className={buttonVariants({})}
            >
              확인
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedDetailOptions;
