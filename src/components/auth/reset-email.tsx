'use client';

import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants/path';

import { Button } from '../ui/button';

const ResetEmail = ({ email }: { email: string }) => {
  return (
    <div className="flex flex-col w-[360px] items-center gap-[40px]">
      <Image
        src="/logo-typo.png"
        width={190}
        height={50}
        alt="freedea"
      />
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="text-[20px] text-slate-800 font-[700]">
            이메일 찾기
          </div>
          <div className="text-[14px] text-slate-500 font-[400]">
            가입 이메일을 알려드려요
          </div>
        </div>
        <div className="my-[30px] text-[24px] font-[700] text-slate-800">
          {email}
        </div>
      </div>
      <Link href={PATH.home}>
        <Button
          size="2xl"
          rounded={false}
          className="w-[360px]"
          variant="accent"
        >
          메인으로 이동
        </Button>
      </Link>
      <Link href={PATH.forgotPassword}>
        <div className="text-[16px] font-[500] text-slate-500">
          비밀번호 찾기
        </div>
      </Link>
    </div>
  );
};

export default ResetEmail;
