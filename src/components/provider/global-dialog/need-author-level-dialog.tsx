'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
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

export function NeedAuthorLevelDialog() {
  const { isAuthorLevelDialogOpen, setIsAuthorLevelDialogOpen } =
    useGlobalDialogStore();

  return (
    <Dialog
      open={isAuthorLevelDialogOpen}
      onOpenChange={setIsAuthorLevelDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="mb-[30px]">
          <DialogTitle>작가만 이용 가능한 서비스예요.</DialogTitle>
          <DialogDescription>작가 신청을 하시겠어요?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="w-full"
              variant="outline"
              size="lg"
            >
              나중에
            </Button>
          </DialogClose>
          <Button
            className="w-full"
            variant="accent"
            size="lg"
            asChild
          >
            <Link href={PATH.myAuthorApply}>작가 신청하기</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
