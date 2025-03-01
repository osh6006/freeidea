'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

const tempTypeObj = {
  news: '소식',
  general: '일반',
  important: '중요',
  winner: '당첨자 발표',
};

interface IUseCenterWritingListProps {
  writingList: {
    id: string;
    title: string;
    date: string;
    type: 'news' | 'important' | 'general' | 'winner';
  }[];
  className?: string;
  path: string;
}

const UseCenterWritingList: React.FunctionComponent<
  IUseCenterWritingListProps
> = ({ writingList, className, path }) => {
  const router = useRouter();
  return (
    <section className={cn('', className)}>
      <ul>
        {writingList.map((write) => (
          <li
            key={write.id}
            className="flex items-center justify-between py-[16px] border-b border-b-slate-200 cursor-pointer"
            onClick={() => router.push(`/${path}/${write.id}`)}
          >
            <div className="flex items-center gap-x-[6px]">
              <span
                className={cn(
                  'flex items-center text-sm justify-center mx-[24px] leading-[150%] tracking-[-0.28px] px-[14px] py-[5.5px]',
                  write.type === 'important'
                    ? 'bg-primary rounded-full text-white '
                    : 'font-medium text-slate-500'
                )}
              >
                {tempTypeObj[write.type]}
              </span>
              <span className="text-base font-medium text-slate-700 tracking-[0.32px]">
                {write.title}
              </span>
            </div>
            <time className="text-base leading-[150%] text-slate-500">
              {write.date}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UseCenterWritingList;
