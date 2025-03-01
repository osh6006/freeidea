'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SearchMd } from '@untitled-ui/icons-react';

interface IUseCenterSideMenuProps {
  className?: string;
}

const UseCenterSideMenu: React.FunctionComponent<IUseCenterSideMenuProps> = ({
  className,
}) => {
  return (
    <aside className={cn('w-[232px] sticky top-4 h-fit ', className)}>
      <div>
        <div
          className="relative px-[12px] flex items-center justify-between rounded-[4px] border gap-x-[24px] bg-white border-slate-200

      "
        >
          <Input
            placeholder="검색하기"
            className="border-none focus-visible:ring-offset-0 focus:outline-none bg-transparent m-0 p-0 focus-visible:ring-0"
          />
          <SearchMd className="w-5 h-5 text-slate-700 untitled-icon" />
        </div>
        <div className="mt-[14px] rounded-[4px] p-[20px] pb-[10px] border border-slate-200 ">
          <div className="font-bold text-base tracking-[0.32px]">
            관련 다른 도움말
          </div>
          <ul className="mt-[20px] text-sm space-y-[10px]">
            <li className="py-[10px] cursor-pointer">신청자 가이드</li>
            <li className="py-[10px] cursor-pointer">작가 가이드</li>
            <li className="py-[10px] cursor-pointer">프리미엄 작가 등록</li>
            <li className="py-[10px] cursor-pointer">배너 광고 안내</li>
            <li className="py-[10px] cursor-pointer">고객 문의</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default UseCenterSideMenu;
