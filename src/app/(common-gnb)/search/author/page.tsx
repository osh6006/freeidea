'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Inner from '@/components/common/inner';
import TotalNumber from '@/components/common/total-number';
import { SearchSubNavbar } from '@/components/navbar/sub-nav-bar';
import AuthorCard from '@/components/search-author/author-card';
import EmptySearchResult from '@/components/search-result/empty-search-result';
import { useSearchAuthorQuery } from '@/service/search/use-service';

export default function SearchPage({
  searchParams: { keyword, sort, useRange, category },
}: {
  searchParams: {
    keyword?: string;
    useRange?: string;
    sort?: string;
    category?: string;
  };
}) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchAuthorQuery({
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

  const { flattenList: authors, pages } = data;
  const { count } = pages[0];

  return (
    <main>
      <SearchSubNavbar />
      <Inner
        maxWidth={1200}
        className="mt-[50px] mb-[200px]"
      >
        <TotalNumber
          number={count || 0}
          className="my-[20px]"
        />
        {authors && authors.length > 0 ? (
          <ul className="grid grid-cols-3 gap-x-[30px] gap-y-[50px] mt-[20px] w-full ">
            {authors.map((author) => (
              <li key={author.studioId}>
                <AuthorCard {...author} />
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
