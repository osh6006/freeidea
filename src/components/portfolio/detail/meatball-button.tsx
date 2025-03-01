'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useDeletePortfolio,
  usePortfolioDetail,
} from '@/service/portfolio/use-service';
import { DialogDescription } from '@radix-ui/react-dialog';
import { DotsHorizontal } from '@untitled-ui/icons-react';

function MeatballButton() {
  const { id } = useParams<{ id: string }>();
  const { data: myInfo } = useMyInfoQuery();
  const { data: portfolio } = usePortfolioDetail(id);
  const { mutate: deleteMutate } = useDeletePortfolio(id);
  const { push } = useRouter();

  const isMine = myInfo?.userId === portfolio?.author.userId;

  if (!isMine) return null;

  const onDelete = () =>
    deleteMutate(undefined, {
      onSuccess: () => {
        if (!myInfo?.studioId) return;
        push(PATH.studio(myInfo.studioId));
      },
    });

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="self-end">
            <DotsHorizontal className="size-[24px]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="typo-body-14-medium-100-tight p-[8px] flex flex-col gap-[10px]">
            <DropdownMenuItem asChild>
              <Link href={`${PATH.portfolioUpdate(id)}`}>수정하기</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-error"
              asChild
            >
              <DialogTrigger>삭제하기</DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>삭제하기</DialogTitle>
            <DialogDescription>
              글을 삭제하시겠습니까?
              <br />글 삭제시 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onDelete}>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MeatballButton;
