'use client';

import { useInView } from 'react-intersection-observer';

import { useSearchParams } from 'next/navigation';

import AuthorCard from '@/components/search-author/author-card';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useSearchAuthorQuery } from '@/service/search/use-service';

import Empty from '../ui/empty';

const AuthorList = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;
  const useRange = searchParams.get('useRange') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  const { data: myInfo } = useMyInfoQuery();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSearchAuthorQuery({
      keyword,
      sort,
      useRange,
      category,
    });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  if (!data) return;

  const authorList = data?.flattenList;

  if (authorList.length === 0) {
    return <Empty>검색 결과가 없습니다.</Empty>;
  }

  return (
    <section className="mt-[22px]">
      <ul className="grid grid-cols-3 gap-x-[30px] gap-y-[50px]">
        {authorList
          ? authorList?.map((author) => (
              <li key={author.studioId}>
                <AuthorCard
                  {...author}
                  isMine={author.userId === myInfo?.userId}
                />
              </li>
            ))
          : null}
      </ul>
      {hasNextPage && <div ref={ref} />}
    </section>
  );
};

export default AuthorList;
