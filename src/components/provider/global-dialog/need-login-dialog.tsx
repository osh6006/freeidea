'use client';

import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';

import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { useGlobalDialogStore } from './store';

export function NeedLoginDialog() {
  const {
    isNeedLoginDialogOpen,
    setIsNeedLoginDialogOpen,
    setIsLoginDialogOpen,
  } = useGlobalDialogStore();

  return (
    <Dialog
      open={isNeedLoginDialogOpen}
      onOpenChange={setIsNeedLoginDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="mb-[30px]">
          <DialogTitle>로그인 후 이용 가능한 서비스예요.</DialogTitle>
          <DialogDescription>
            로그인 후 프리디어의 다양한 서비스를 경험해보세요!
          </DialogDescription>
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
          <DialogClose asChild>
            <Button
              className="w-full"
              variant="accent"
              onClick={() => setIsLoginDialogOpen(true)}
              size="lg"
            >
              로그인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
