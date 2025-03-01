'use client';

import Link from 'next/link';

import { scrapTabDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import useQueryString from '@/hooks/use-query-string';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '../../ui/button';

export default function ScrapListUseFilterToggle() {
  const { searchParams, createQueryString, deleteQueryString } =
    useQueryString();

  const paramName = 'tab';

  const PRODUCT = scrapTabDict.data.product.en;
  const PORTFOLIO = scrapTabDict.data.portfolio.en;
  const FEED = scrapTabDict.data.feed.en;

  const tab = searchParams.get(paramName);

  const activeStyle = buttonVariants({ variant: 'accent', rounded: true });
  const nonActiveStyle = buttonVariants({ variant: 'outline', rounded: true });

  return (
    <div className="flex gap-[10px]">
      <Button
        className={cn(tab === PRODUCT ? activeStyle : nonActiveStyle)}
        asChild
      >
        <Link
          href={{
            pathname: PATH.myScrap,
            query: { tab: PRODUCT },
          }}
          replace
        >
          판매작품
        </Link>
      </Button>
      <Button
        asChild
        className={cn(tab === PORTFOLIO ? activeStyle : nonActiveStyle)}
      >
        <Link
          href={{
            pathname: PATH.myScrap,
            query: { tab: PORTFOLIO },
          }}
          replace
        >
          포트폴리오
        </Link>
      </Button>
      <Button
        className={cn(tab === FEED ? activeStyle : nonActiveStyle)}
        asChild
      >
        <Link
          href={{
            pathname: PATH.myScrap,
            query: { tab: FEED },
          }}
          replace
        >
          피드
        </Link>
      </Button>
    </div>
  );
}
