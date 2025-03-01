'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Inner from '@/components/common/inner';
import TotalNumber from '@/components/common/total-number';
import QnaCard from '@/components/lounge/qna/card';
import QnaCommentRank from '@/components/lounge/qna/comment-rank';
import { SearchSubNavbar } from '@/components/navbar/sub-nav-bar';
import EmptySearchResult from '@/components/search-result/empty-search-result';
import Spinner from '@/components/ui/spinner';
import { PATH } from '@/constants/path';
import { useSearchQnaQuery } from '@/service/search/use-service';

export const dynamic = 'force-dynamic';

export default function SearchPage({
  searchParams,
}: {
  searchParams: {
    keyword: string;
  };
}) {
  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchQnaQuery({
    keyword: searchParams.keyword || '',
    params: {
      limit: 10,
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const list = data?.flattenList || [];

  return (
    <main>
      <SearchSubNavbar />
      <Inner
        maxWidth={1200}
        className="mt-[50px] mb-[200px]"
      >
        <TotalNumber
          number={data?.pages[0].count || 0}
          className="my-[20px]"
        />

        {list.length > 0 ? (
          <div className="w-full flex justify-between gap-x-[60px]">
            <ul className="flex flex-col flex-1 w-full gap-y-[30px] ">
              {list?.map((qna) => {
                return (
                  <li
                    key={qna.qnaId}
                    className="cursor-pointer"
                  >
                    <Link href={PATH.loungeQnaDetail(qna.qnaId)}>
                      <QnaCard
                        key={qna.qnaId}
                        {...qna}
                      />
                    </Link>
                  </li>
                );
              })}
              {isRefetching && (
                <div className="w-full flex items-center justify-center ">
                  <Spinner />
                </div>
              )}
              <div ref={ref} />
            </ul>
            <div>
              <QnaCommentRank />
            </div>
          </div>
        ) : (
          <EmptySearchResult />
        )}
      </Inner>
    </main>
  );
}
