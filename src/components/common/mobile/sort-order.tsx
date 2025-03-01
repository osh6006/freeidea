'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import useQueryString from '@/hooks/use-query-string';
import { SwitchVertical01 } from '@untitled-ui/icons-react';

import {
  MobileSheetOptionBody,
  MobileSheetOptionClose,
  MobileSheetOptionContent,
  MobileSheetOptionHeader,
  MobileSheetOptionTitle,
} from './sheet';

interface ISortOrderProps {
  sortList: {
    label: string;
    value: string;
  }[];
  paramName?: string;
}

const MobileSortOrder: React.FunctionComponent<ISortOrderProps> = ({
  sortList,
  paramName = 'sort',
}) => {
  const router = useRouter();
  const { pathname, createQueryString, searchParams } = useQueryString();
  const sortName = searchParams.get(paramName) || sortList[0].value;
  const selectedSort = sortList.find((sort) => sort.value === sortName);

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-x-[10px] text-[14px] font-medium tracking-base pc-screen:hidden">
        {selectedSort?.label}
        <SwitchVertical01 className="size-[20px]" />
      </SheetTrigger>
      <MobileSheetOptionContent>
        <MobileSheetOptionHeader>
          <MobileSheetOptionTitle>정렬</MobileSheetOptionTitle>
        </MobileSheetOptionHeader>
        <MobileSheetOptionBody>
          {sortList.map((el) => (
            <MobileSheetOptionClose
              key={el.value}
              asChild
            >
              <button
                onClick={() => {
                  router.replace(
                    pathname + '?' + createQueryString(paramName, el.value),
                    { scroll: false }
                  );
                }}
              >
                {el.label}
              </button>
            </MobileSheetOptionClose>
          ))}
        </MobileSheetOptionBody>
      </MobileSheetOptionContent>
    </Sheet>
  );
};

export default MobileSortOrder;
