import { RedirectType, redirect } from 'next/navigation';

import ScrapFeed from '@/components/mypage/scrap/scrap-feed';
import ScrapListUseFilterToggle from '@/components/mypage/scrap/scrap-list-use-filter-toggle';
import ScrapPortfolio from '@/components/mypage/scrap/scrap-portfolio';
import ScrapProduct from '@/components/mypage/scrap/scrap-product';
import { scrapTabDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export default async function ScrapePage({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  if (!searchParams.tab) {
    redirect(`${PATH.myScrap}?tab=PRODUCT`, RedirectType.replace);
  }

  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex pl-[40px] flex-col mt-[40px]">
        <div className="flex flex-col gap-[16px]">
          <div className="typo-title-24-bold-tight">스크랩</div>
          <div className="w-full h-[1px] bg-slate-200"></div>
        </div>
        <div className="w-full flex justify-between items-center my-[20px] ">
          <ScrapListUseFilterToggle />
        </div>
        {searchParams.tab === scrapTabDict.data.product.en && <ScrapProduct />}
        {searchParams.tab === scrapTabDict.data.portfolio.en && (
          <ScrapPortfolio />
        )}
        {searchParams.tab === scrapTabDict.data.feed.en && <ScrapFeed />}
      </div>
    </HydrationBoundary>
  );
}
