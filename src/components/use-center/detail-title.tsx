import * as React from 'react';

import { cn } from '@/lib/utils';

interface IUseCenterDetailTitleProps {
  children: React.ReactNode;
  date: string;
  className?: string;
}

const UseCenterDetailTitle: React.FunctionComponent<
  IUseCenterDetailTitleProps
> = ({ children, className, date }) => {
  return (
    <h1
      className={cn(
        'mt-[42px] text-[28px] font-bold text-slate-800 w-full flex justify-between items-center',
        className
      )}
    >
      {children}
      <time className="font-medium text-sm tracking-[-0.28px] text-slate-500 ">
        {date}
      </time>
    </h1>
  );
};

export default UseCenterDetailTitle;
