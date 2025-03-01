'use client';

import { useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useModalWithBack } from '@/hooks/use-modal-with-back';

import { UntitledIcon } from '../icon';
import ApplyForm from './apply-form';

const RequestApplyDialog = ({ id }: { id: string }) => {
  const { open, setOpen } = useModalWithBack();
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button
            size="2xl"
            className="w-full typo-body-16-medium-100-tight pc-screen:w-[170px] "
          >
            지원하기
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[100dvw] h-dvh p-0 bg-white pc-screen:h-fit pc-screen:max-w-[480px]">
          <ScrollArea className="max-h-[100dvh] pb-[70px] pc-screen:max-h-[678px] pc-screen:pt-[32px] pc-screen:pb-[24px] ">
            <DialogHeader className="px-5 py-3">
              <div className="flex items-center">
                <DialogClose className="mr-3 pc-screen:hidden">
                  <UntitledIcon.ChevronLeft />
                </DialogClose>
                <DialogTitle className="text-left typo-title-18-bold-100 pc-screen:typo-title-24-bold-140-tight pc-screen:text-center">
                  의뢰 지원하기
                </DialogTitle>
              </div>

              <DialogDescription
                className={`
                mt-6 px-4 py-3 bg-slate-50 text-center text-slate-800 rounded-[6px]
                pc-screen:p-0 pc-screen:bg-transparent pc-screen:mt-3 pc-screen:text-slate-50 pc-screen:typo-body-14-regular-150-tight
                `}
              >
                내용을 자세히 입력할 수록 회신 가능성이 높아집니다.
              </DialogDescription>
            </DialogHeader>
            <ApplyForm
              id={id}
              setOpen={setOpen}
              setAlertOpen={setAlertOpen}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              의뢰 지원이 완료되었습니다.
            </DialogTitle>
            <DialogDescription className="text-center">
              다른 다양한 의뢰도 확인해보세요.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-10">
            <DialogClose
              className={buttonVariants({
                className: 'w-full',
              })}
            >
              확인
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestApplyDialog;
