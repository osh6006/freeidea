import Link from 'next/link';

import CategoryFilter from '@/components/common/category-filter';
import Inner from '@/components/common/inner';
import MobileSortOrder from '@/components/common/mobile/sort-order';
import ScrollUpButton from '@/components/common/scroll-up-button';
import SearchTagFilter from '@/components/common/search-tagFilter';
import SortOrder from '@/components/common/sort-order';
import TotalNumber from '@/components/common/total-number';
import SearchParamsCacheProvider from '@/components/provider/searchparams-cache-provider';
import RequestList from '@/components/request/request-list';
import { buttonVariants } from '@/components/ui/button';
import { COMMON_CATEGORIES, COMMON_SORTS } from '@/constants/common';
import { PATH } from '@/constants/path';
import { metadataMap } from '@/lib/metadata';
import { requestListOption } from '@/service/request/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const metadata = metadataMap.request;

export default async function RequestPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    sort?: string;
    useRange?: string;
  };
}) {
  const queryClient = new QueryClient();
  const { pages } = await queryClient.fetchInfiniteQuery(
    requestListOption(searchParams)
  );

  const count = pages[0].count;

  const isList = count > 0;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchParamsCacheProvider
        searchParams={{
          category: searchParams.category,
          useRange: searchParams.useRange,
          sort: searchParams.sort,
          inProgressOnly: 'false',
        }}
      >
        <CategoryFilter categories={COMMON_CATEGORIES} />
        <Inner maxWidth={1200}>
          <div className="flex justify-between items-center px-5 mt-5 pc-screen:mt-[50px] pc-screen:px-0">
            <TotalNumber
              number={count || 0}
              className=""
            />
            {!isList && (
              <Link
                href={PATH.requestCreate}
                className={buttonVariants({
                  size: 'sm',
                  className: 'w-20 typo-body-16-medium-100-tight',
                })}
              >
                의뢰하기
              </Link>
            )}
          </div>

          {isList ? (
            <>
              <div className="w-full flex justify-between items-center max-w-[1200px] mx-auto my-[20px] px-5 pc-screen:px-0">
                <div className="flex gap-[10px]">
                  <SearchTagFilter
                    queryKey="useRange"
                    queryValue="NON_PROFIT"
                  >
                    비상업용
                  </SearchTagFilter>
                  <SearchTagFilter
                    queryKey="useRange"
                    queryValue="PROFIT"
                  >
                    상업용
                  </SearchTagFilter>
                </div>
                <SortOrder sortList={COMMON_SORTS} />
                <MobileSortOrder sortList={COMMON_SORTS} />
              </div>
              <RequestList />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] pc-screen:min-h-[500px] ">
              <div className="text-slate-800 typo-title-18-bold-100 pc-screen:typo-title-24-bold-tight ">
                해당 의뢰하기 글이 아직 없어요
              </div>
              <p className="text-slate-500 typo-caption-12-regular-100 mt-2 pc-screen:typo-body-16-regular-150 pc-screen:mt-[30px]">
                위 검색어에 대한 의뢰글을 먼저 남겨보시겠어요?
              </p>
              <Link
                href={PATH.requestCreate}
                className={buttonVariants({
                  size: '2xl',
                  className: 'w-[300px] mt-[40px] hidden pc-screen:block',
                })}
              >
                의뢰하기
              </Link>
            </div>
          )}
        </Inner>
        <ScrollUpButton />
      </SearchParamsCacheProvider>
    </HydrationBoundary>
  );
}
