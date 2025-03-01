'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import QnaCard from '@/components/lounge/qna/card';
import Spinner from '@/components/ui/spinner';
import { PATH } from '@/constants/path';
import { useMyQuestionQuery } from '@/service/mypage/use-service';

const MyPageQnaList = () => {
  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyQuestionQuery({});

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const list = data?.flattenList || [];
  const isEmpty = list.length <= 0;

  return (
    <ul className="space-y-[30px]">
      {isEmpty ? (
        <li className="w-full flex items-center justify-center my-[200px] typo-title-24-bold-tight ">
          질문이 없어요
        </li>
      ) : (
        <>
          {list?.map((qna) => (
            <li
              key={qna.qnaId}
              className="cursor-pointer "
            >
              <Link href={PATH.loungeQnaDetail(qna.qnaId)}>
                <QnaCard
                  key={qna.qnaId}
                  {...qna}
                />
              </Link>
            </li>
          ))}
        </>
      )}
      {isRefetching && (
        <div className="w-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </ul>
  );
};

export default MyPageQnaList;
