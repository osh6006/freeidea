import React from 'react';

import Inner from '@/components/common/inner';
import ScrollUpButton from '@/components/common/scroll-up-button';
import SortOrder from '@/components/common/sort-order';
import TotalNumber from '@/components/common/total-number';
import StoreItemList from '@/components/store/list/store-item-list';
import UseRangeToggle from '@/components/store/list/store-list-use-range-toggle';
import { COMMON_SORTS } from '@/constants/common';
import { metadataMap } from '@/lib/metadata';
import { storeListOption } from '@/service/store/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

interface Props {
  searchParams: {
    category?: string;
    sort?: string;
    useRange?: string;
  };
}

export const metadata = metadataMap.store;

export default async function StorePage({ searchParams }: Props) {
  const filterParams = {
    category: searchParams.category,
    sort: searchParams.sort,
    useRange: searchParams.useRange,
  };

  const queryClient = new QueryClient();
  const { pages } = await queryClient.fetchInfiniteQuery(
    storeListOption(filterParams)
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Inner
        as="main"
        className="relative pt-[50px] pb-[220px]"
      >
        <TotalNumber number={pages[0].count} />
        <div className="w-full flex justify-between items-center my-[20px] ">
          <UseRangeToggle />
          <SortOrder sortList={COMMON_SORTS} />
        </div>
        <StoreItemList />
        <ScrollUpButton />
      </Inner>
    </HydrationBoundary>
  );
}
