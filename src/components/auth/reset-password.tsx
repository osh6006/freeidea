import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants/path';

import { Button } from '../ui/button';

interface IResetPasswordProps {
  email: string;
}

const ResetPassword = ({ email }: IResetPasswordProps) => {
  return (
    <>
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
              비밀번호 찾기
            </div>
            <div className="text-[14px] text-slate-500 font-[400]">{email}</div>
          </div>
          <div className="flex flex-col justify-center items-center my-[30px] text-[24px] font-[700] text-slate-800">
            <div>입력하신 이메일로</div>
            <div>비밀번호 재설정 링크를 보내드렸어요</div>
          </div>
        </div>
        <Button
          asChild
          className="w-[360px]"
        >
          <Link href={PATH.home}>메인으로 이동</Link>
        </Button>
      </div>
    </>
  );
};

export default ResetPassword;
