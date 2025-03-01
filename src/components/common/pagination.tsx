'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from '@untitled-ui/icons-react';

import { Button } from '../ui/button';

interface IPaginationProps {
  totalPost: number;
  visibleButtonCount?: number;
  pagePerItem: number;
  paramName?: string;
  replace?: boolean;
  className?: string;
  scroll?: boolean;
}
/**
 * @deprecated CommonPagination 을 사용해주세요.
 */
const Pagination = ({
  totalPost,
  pagePerItem,
  visibleButtonCount = 5,
  replace = false,
  scroll = false,
  paramName = 'page',
  className,
}: IPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalPost / pagePerItem);
  const currentPage = Number(searchParams.get(paramName)) || 1;
  const pageGroup = Math.ceil(currentPage / visibleButtonCount);

  let lastNumber = pageGroup * visibleButtonCount;

  if (lastNumber > totalPages) {
    lastNumber = totalPages;
  }

  const firstNumber = (pageGroup - 1) * visibleButtonCount + 1;

  const pageArr = Array.from(
    { length: lastNumber - firstNumber + 1 },
    (_, index) => firstNumber + index
  );

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPrevFivePageUrl = () => {
    const prevPage = Math.max(currentPage - 5, 1);
    return createPageURL(prevPage);
  };

  const getNextFivePageUrl = () => {
    const nextPage = Math.min(currentPage + 5, totalPages);
    return createPageURL(nextPage);
  };

  const getPageUrl = (page: number) => {
    return createPageURL(page);
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <div className="mx-auto flex items-center gap-x-[2px]">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          className={cn(
            'p-0 aspect-square disabled:bg-transparent disabled:text-slate-300  border-none'
          )}
          asChild
        >
          <Link
            replace={replace}
            scroll={scroll}
            href={getPrevFivePageUrl()}
          >
            <ChevronLeft
              width={18}
              className={cn(currentPage >= totalPages && 'text-slate-600')}
            />
          </Link>
        </Button>
        <ul className="flex items-center gap-x-[2px]">
          {pageArr.map((page) => (
            <li key={page}>
              <Button
                type="button"
                variant={currentPage === page ? 'accent' : 'outline'}
                size="sm"
                className={cn(
                  'typo-body-14-semi-bold-100-tight px-1 py-[9px] aspect-square rounded-[6px] border-none'
                )}
                asChild
              >
                <Link
                  replace={replace}
                  scroll={scroll}
                  href={getPageUrl(page)}
                >
                  {page}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          className={cn(
            'p-0 aspect-square disabled:bg-transparent disabled:text-slate-300  border-none'
          )}
          asChild
        >
          <Link
            href={getNextFivePageUrl()}
            replace={replace}
            scroll={scroll}
          >
            <ChevronRight
              width={18}
              className={cn(currentPage >= totalPages && 'text-slate-600')}
            />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
