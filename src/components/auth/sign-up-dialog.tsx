'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { PATH } from '@/constants/path';

import { useGlobalDialogStore } from '../provider/global-dialog/store';

interface SignUpDialogProps {
  open: boolean;
  nickname: string;
}

const SignUpDialog = ({ open, nickname }: SignUpDialogProps) => {
  const { setIsLoginDialogOpen } = useGlobalDialogStore();
  return (
    <Dialog open={open}>
      <DialogContent className="w-[380px] md:rounded-[16px] rounded-[16px] h-[211px]">
        <DialogTitle className="hidden">Welcome</DialogTitle>
        <div className="flex flex-col justify-center items-center text-center">
          <div className="typo-title-24-bold-tight">
            {nickname}님, 환영합니다!
          </div>
          <div className="typo-body-14-regular-150-tight text-slate-600 mt-[8px]">
            이제 프리디어의 다양한 서비스를 경험해보세요!
          </div>
          <div className="flex gap-[8px] mt-[20px]">
            <DialogClose asChild>
              <Button
                asChild
                className="w-[162px] h-[40px] hover:bg-slate-tint-5 bg-white rounded-[4px] border-[1px] border-slate-200 font-[500] text-[16px] text-slate-600"
              >
                <Link href={PATH.home}>나중에</Link>
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                asChild
                onClick={() => setIsLoginDialogOpen(true)}
                className="w-[162px] h-[40px] bg-[#FF96B5] text-white font-[500] rounded-[4px]"
              >
                <Link href={PATH.home}>로그인</Link>
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
