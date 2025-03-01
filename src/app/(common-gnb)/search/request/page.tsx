'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Inner from '@/components/common/inner';
import RequestCard from '@/components/request/request-card';
import EmptySearchResult from '@/components/search-result/empty-search-result';
import SearchResultHeader from '@/components/search-result/header';
import { useSearchRequestQuery } from '@/service/search/use-service';
import { TCategory, TSort, TUseRange } from '@/types/common';

export default function SearchPage({
  searchParams: { keyword, sort, useRange, category },
}: {
  searchParams: {
    keyword: string;
    useRange?: TUseRange;
    sort?: TSort;
    category?: TCategory;
  };
}) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchRequestQuery({
      keyword,
      sort,
      useRange,
      category,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!data) return;
  const { count } = data.pages[0];
  const { flattenList: requests } = data;

  return (
    <main>
      <SearchResultHeader totalCount={count || 0} />
      <Inner
        maxWidth={1200}
        className="mt-[50px] mb-[200px]"
      >
        {requests.length !== 0 ? (
          <ul className="grid grid-cols-1 gap-x-[20px] mt-[20px] w-full ">
            {requests?.map((request) => (
              <li key={request.inquiryId}>
                <RequestCard {...request} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptySearchResult />
        )}

        <div
          ref={ref}
          style={{ height: '20px', background: 'transparent' }}
        >
          {isFetchingNextPage ? <p>데이터를 로딩 중 입니다...</p> : null}
        </div>
      </Inner>
    </main>
  );
}
