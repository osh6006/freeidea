import * as React from 'react';

import { cn } from '@/lib/utils';

interface IUseCenterBannerProps {
  title: string;
  desc: string;
  className?: string;
}

const UseCenterBanner: React.FunctionComponent<IUseCenterBannerProps> = ({
  title,
  desc,
  className,
}) => {
  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center w-full mt-[48px] mb-[60px]',
        className
      )}
    >
      <h1 className="text-[40px] font-bold leading-[150%] text-slate-700">
        {title}
      </h1>
      <p className="">{desc}</p>
    </section>
  );
};

export default UseCenterBanner;
