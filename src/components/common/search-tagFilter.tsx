'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import useQueryString from '@/hooks/use-query-string';
import { cn } from '@/lib/utils';

interface ISearchTagFilterProps {
  queryKey: string;
  queryValue: string;
  children: string;
  className?: string;
  isDefault?: boolean;
}
const DefaultStyle = `inline-flex w-fit h-[40px] px-[20px] rounded-[100px] border-[1px] border-[#DBDEE3] py-[12px] cursor-pointer bg-[#FFFFFF] text-slate-600 text-[16px] font-[500] whitespace-nowrap
  hover:bg-primary hover:text-white
  `;
const ActiveStyle =
  'inline-flex w-fit h-[40px] px-[20px] rounded-[100px] border-[1px] border-pink-500 py-[12px] cursor-pointer bg-pink-500 text-white text-[16px] font-[500] whitespace-nowrap';

const SearchTagFilter = ({
  queryKey,
  queryValue,
  children,
  className = '',
  isDefault = false,
}: ISearchTagFilterProps) => {
  const { pathname, searchParams, createQueryString, deleteQueryString } =
    useQueryString();
  const currentQuery = searchParams.get(queryKey);

  const isActive = isDefault
    ? currentQuery === queryValue || currentQuery === null
    : currentQuery === queryValue;

  const pathToMove = isActive
    ? pathname + '?' + deleteQueryString(queryKey)
    : pathname + '?' + createQueryString(queryKey, queryValue);

  return (
    <Link href={pathToMove}>
      <Badge
        className={cn('', isActive ? ActiveStyle : DefaultStyle, className)}
      >
        {children}
      </Badge>
    </Link>
  );
};

export default SearchTagFilter;
