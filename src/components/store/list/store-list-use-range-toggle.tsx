'use client';

import Link from 'next/link';

import { useRangeDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import useQueryString from '@/hooks/use-query-string';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '../../ui/button';

export default function UseRangeToggle() {
  const { searchParams, createQueryString, deleteQueryString } =
    useQueryString();

  const paramName = 'useRange';

  const PROFIT = useRangeDict.data.profit.en;
  const NON_PROFIT = useRangeDict.data.nonProfit.en;

  const useRangeParam = searchParams.get(paramName);

  const activeStyle = buttonVariants({ variant: 'accent', rounded: true });
  const nonActiveStyle = buttonVariants({ variant: 'outline', rounded: true });

  return (
    <div className="flex gap-[10px]">
      <Button
        className={cn(
          useRangeParam === NON_PROFIT ? activeStyle : nonActiveStyle
        )}
        asChild
      >
        <Link
          href={{
            pathname: PATH.storeList,
            query:
              useRangeParam === NON_PROFIT
                ? deleteQueryString(paramName)
                : createQueryString(paramName, NON_PROFIT),
          }}
          replace
          prefetch={false}
        >
          비상업용
        </Link>
      </Button>
      <Button
        asChild
        className={cn(useRangeParam === PROFIT ? activeStyle : nonActiveStyle)}
      >
        <Link
          href={{
            pathname: PATH.storeList,
            query:
              useRangeParam === PROFIT
                ? deleteQueryString(paramName)
                : createQueryString(paramName, PROFIT),
          }}
          replace
          prefetch={false}
        >
          상업용
        </Link>
      </Button>
    </div>
  );
}
