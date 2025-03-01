'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useQueryString from '@/hooks/use-query-string';
import { SwitchVertical01 } from '@untitled-ui/icons-react';

interface ISortOrderProps {
  sortList: {
    label: string;
    value: string;
  }[];
  paramName?: string;
}

const SortOrder: React.FunctionComponent<ISortOrderProps> = ({
  sortList,
  paramName = 'sort',
}) => {
  const router = useRouter();
  const { pathname, createQueryString, searchParams } = useQueryString();
  const sortName = searchParams.get(paramName) || sortList[0].value;
  const selectedSort = sortList.find((sort) => sort.value === sortName);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="hidden items-center gap-x-[10px] text-[14px] font-medium tracking-base pc-screen:flex">
        {selectedSort?.label}
        <SwitchVertical01 className="size-[20px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="px-2 py-[10px] text-[14px] font-medium tracking-base text-slate-800 space-y-[10px] rounded-sm"
      >
        {sortList.map((el) => (
          <DropdownMenuItem
            key={el.value}
            className="px-[12px] py-2 hover:bg-slate-50"
            onClick={() => {
              router.replace(
                pathname + '?' + createQueryString(paramName, el.value),
                { scroll: false }
              );
            }}
          >
            {el.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOrder;
