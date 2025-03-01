'use client';

import Link from 'next/link';

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
import { PATH } from '@/constants/path';

import { useGlobalDialogStore } from './store';

export function NeedUseMembershipDialog() {
  const { isUseMembershipDialogOpen, setIsUseMembershipDialogOpen } =
    useGlobalDialogStore();

  return (
    <Dialog
      open={isUseMembershipDialogOpen}
      onOpenChange={setIsUseMembershipDialogOpen}
    >
      <DialogContent className="h-[243px]">
        <DialogHeader>
          <DialogTitle>멤버십 전용 팡 버튼 입니다.</DialogTitle>
          <DialogDescription>
            가입하기 클릭 시, 멤버십 가입 페이지로 이동됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-center gap-x-2">
          <DialogClose
            className={buttonVariants({
              variant: 'outline',
              className: 'flex-1',
            })}
          >
            나중에
          </DialogClose>
          <DialogClose asChild>
            <Link
              href={PATH.membershipIntro}
              className={buttonVariants({
                className: 'flex-1 p-0',
              })}
            >
              가입하기
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
