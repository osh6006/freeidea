'use client';

import { useInView } from 'react-intersection-observer';

import { useSearchParams } from 'next/navigation';

import { useRequestListQuery } from '@/service/request/use-service';
import { IRequestListParam } from '@/types/request';

import Spinner from '../ui/spinner';
import RequestMobileCard from './mobile/request-card';
import RequestCard from './request-card';

const RequestList = () => {
  const searchParams = useSearchParams();

  const requestParams: IRequestListParam = {
    category: searchParams.get('category') || undefined,
    sort: searchParams.get('sort') || undefined,
    useRange: searchParams.get('useRange') || undefined,
  };

  const { data, isRefetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useRequestListQuery(requestParams);
  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  const list = data?.flattenData || [];
  const length = list.length;

  return (
    <section>
      <ul className="flex flex-col pb-[200px]">
        {length > 0 ? (
          list.map((item) => (
            <li
              key={item.inquiryId}
              className="last:border-[1px] border-slate-200 border-t-transparent border-r-transparent border-l-transparent"
            >
              <RequestCard
                {...item}
                className="hidden md:block"
              />
              <RequestMobileCard
                {...item}
                className="md:hidden "
              />
            </li>
          ))
        ) : (
          <div className="flex justify-center items-center h-[424px]">
            <span className="text-slate-800 text-[24px] font-[700]">
              검색 결과가 없습니다.
            </span>
          </div>
        )}
      </ul>
      {isRefetching && (
        <div className="w-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </section>
  );
};

export default RequestList;
