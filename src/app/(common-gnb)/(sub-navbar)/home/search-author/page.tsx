import React from 'react';

import CategoryFilter from '@/components/common/category-filter';
import Inner from '@/components/common/inner';
import ScrollUpButton from '@/components/common/scroll-up-button';
import SortOrder from '@/components/common/sort-order';
import TotalNumber from '@/components/common/total-number';
import SearchParamsCacheProvider from '@/components/provider/searchparams-cache-provider';
import AuthorList from '@/components/search-author/author-list';
import { COMMON_CATEGORIES, SEARCH_AUTHOR_SORTS } from '@/constants/common';
import { metadataMap } from '@/lib/metadata';
import { searchAuthorQueryOption } from '@/service/search/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

interface Props {
  searchParams: {
    keyword?: string;
    sort?: string;
    useRange?: string;
    category?: string;
  };
}

export const metadata = metadataMap.searchAuthor;

export default async function SearchAuthorPage({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const authorList = await queryClient.fetchInfiniteQuery(
    searchAuthorQueryOption(searchParams)
  );

  const count = authorList.pages[0].count;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="pb-[200px]">
        <SearchParamsCacheProvider searchParams={searchParams}>
          <CategoryFilter categories={COMMON_CATEGORIES} />
          <div className="w-full flex justify-between items-center max-w-[1200px] mx-auto mt-[50px]">
            <TotalNumber number={count} />
            <SortOrder sortList={SEARCH_AUTHOR_SORTS} />
          </div>
          <Inner maxWidth={1200}>
            <AuthorList />
          </Inner>
        </SearchParamsCacheProvider>
      </main>
      <ScrollUpButton />
    </HydrationBoundary>
  );
}
