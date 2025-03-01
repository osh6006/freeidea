'use client';

import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Checkbox } from '@/components/ui/checkbox';

interface INoticeFilterProps {}

type CheckedState = boolean | 'indeterminate';

const NoticeFilter: React.FunctionComponent<INoticeFilterProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCheckedChange = (checked: CheckedState, id: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const filters = currentParams.getAll('filter');

    if (checked === true) {
      // 선택된 필터가 이미 존재하지 않으면 추가
      if (!filters.includes(id)) {
        currentParams.append('filter', id);
      }
    } else if (checked === false) {
      // 선택이 해제되면 필터에서 제거
      const updatedFilters = filters.filter((value) => value !== id);
      currentParams.delete('filter');
      updatedFilters.forEach((filter) =>
        currentParams.append('filter', filter)
      );
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-x-[20px] border border-slate-200 w-fit p-[10px] rounded-[2px]">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="general"
          className="w-5 h-5"
          onCheckedChange={(checked) => handleCheckedChange(checked, 'general')}
          checked={searchParams.getAll('filter').includes('general')}
        />
        <label
          htmlFor="general"
          className="text-sm leading-[150%] tracking-[0.28px] text-slate-500"
        >
          일반
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="news"
          className="w-5 h-5"
          onCheckedChange={(checked) => handleCheckedChange(checked, 'news')}
          checked={searchParams.getAll('filter').includes('news')}
        />
        <label
          htmlFor="news"
          className="text-sm leading-[150%] tracking-[0.28px] text-slate-500"
        >
          소식
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="winner"
          className="w-5 h-5"
          onCheckedChange={(checked) => handleCheckedChange(checked, 'winner')}
          checked={searchParams.getAll('filter').includes('winner')}
        />
        <label
          htmlFor="winner"
          className="text-sm leading-[150%] tracking-[0.28px] text-slate-500"
        >
          당첨자 발표
        </label>
      </div>
    </div>
  );
};

export default NoticeFilter;
