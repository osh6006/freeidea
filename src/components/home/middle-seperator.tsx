'use client';

import { PATH } from '@/constants/path';

import { SecureLink } from '../common/secure-button';
import { buttonVariants } from '../ui/button';

interface IMiddleSeperatorProps {}

const MiddleSeperator: React.FunctionComponent<IMiddleSeperatorProps> = () => {
  return (
    <section className="relative overflow-hidden flex justify-between items-center bg-primary rounded-[10px] py-[22px] px-3 mt-[48px] pc-screen:px-[60px] pc-screen:py-[30px] pc-screen:mt-[60px]">
      <div>
        <div className="typo-body-16-bold-100-tight text-white pc-screen:typo-title-28-bold-100">
          작품을 의뢰해 보세요!
        </div>
        <div className="typo-caption-12-regular-100  text-white pc-screen:typo-body-16-regular-150 mt-2">
          원하는 작품에 맞는 작가님을 찾아보세요
        </div>
      </div>
      <SecureLink
        href={PATH.request}
        requiredLevel="USER"
        className={buttonVariants({
          variant: 'outline',
          className:
            'bg-white w-[80px] text-slate-800 font-bold tracking-base rounded-[4px] pc-screen:w-[188px]',
        })}
      >
        의뢰하기
      </SecureLink>

      {/* shapes */}
      <div className="absolute size-[50px] bg-[#FFF5F81A] rounded-full top-[52px] bottom-[18px] left-[53%]" />
      <div className="absolute size-[100px] bg-[#FFF5F81A] rounded-full bottom-[40px] left-[60%]" />
      <div className="absolute size-[180px] bg-[#FFF5F81A] rounded-full top-[12px] left-[70%]" />
    </section>
  );
};

export default MiddleSeperator;
