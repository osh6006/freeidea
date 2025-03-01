'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { COMMON_CATEGORIES } from '@/constants/common';
import { categoryDict } from '@/constants/dictionary';
import useQueryString from '@/hooks/use-query-string';
import { cn } from '@/lib/utils';
import { ChevronDown } from '@untitled-ui/icons-react';

const CategoryDropDown = () => {
  const { pathname, createQueryString, searchParams, deleteQueryString } =
    useQueryString();

  const [isOpen, setIsOpen] = useState(false);

  const activeCategory = categoryDict
    .getTranslator('en-ko')
    .translate(searchParams.get('category') || '');

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownMenuTrigger className="w-[127px] h-[40px] px-4 rounded-[4px] border border-[#DBDEE3] flex gap-[12px] justify-between items-center cursor-pointer">
        <div className="typo-body-16-medium-100-tight text-slate-600">
          {activeCategory || '카테고리'}
        </div>
        <ChevronDown
          className={cn(
            'h-[20px] w-[20px] shrink-0 transition-transform duration-200'
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="flex max-w-[160px] p-0"
      >
        <DropdownMenuGroup className="flex flex-col px-2 py-[10px] gap-y-[10px] w-full">
          {COMMON_CATEGORIES.map((category) => {
            const path =
              category.value === searchParams.get('category')
                ? `${pathname}?${deleteQueryString('category')}`
                : `${pathname}?${createQueryString('category', category.value)}`;

            return (
              <Link
                key={category.value}
                href={path}
              >
                <DropdownMenuItem className="typo-body-14-medium-100-tight w-[144px] h-[36px] px-[12px] py-2 text-[14px] cursor-pointer">
                  {category.label}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropDown;
