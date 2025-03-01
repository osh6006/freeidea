'use client';

import { useInView } from 'react-intersection-observer';

import { SecureLink } from '@/components/common/secure-button';
import Spinner from '@/components/ui/spinner';
import { PATH } from '@/constants/path';
import { useQnaListQuery } from '@/service/qna/use-service';

import QnaCard from './card';

const QnaList = () => {
  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useQnaListQuery({});

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <ul className="flex flex-col flex-1 w-full gap-y-[30px] ">
      {data.flattenList?.map((qna) => {
        return (
          <li
            key={qna.qnaId}
            className="cursor-pointer"
          >
            <SecureLink
              requiredLevel="USER"
              href={PATH.loungeQnaDetail(qna.qnaId)}
              className="text-left"
            >
              <QnaCard
                key={qna.qnaId}
                {...qna}
              />
            </SecureLink>
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
  );
};

export default QnaList;
