import * as React from 'react';

import { cn } from '@/lib/utils';

interface IBottomBannerProps {
  className?: string;
}

const BottomBanner = ({ className }: IBottomBannerProps) => {
  return (
    <section
      style={{
        backgroundImage: `url("/bottom-banner-background.jpeg")`,
      }}
      className={cn(
        'h-[200px] mt-4 pc-screen:mt-[200px] flex flex-col items-center justify-center bg-cover text-white relative',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-image-bottom-banner" />
      <div className="text-[28px] font-bold">나의 아트, 나의 공간</div>
      <p className="text-[18px] leading-[150%] text-center">
        누구나 작품의 공간속으로 갈 수 있는 곳
      </p>
    </section>
  );
};

export default BottomBanner;
