'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams, useSearchParams } from 'next/navigation';

import { ProductCard } from '@/components/common/product-card';
import SearchTagFilter from '@/components/common/search-tagFilter';
import SortOrder from '@/components/common/sort-order';
import CategoryDropDown from '@/components/search-result/category-dropdown';
import { COMMON_SORTS } from '@/constants/common';
import { useRangeDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useStudioStoreListQuery } from '@/service/studio/use-service';

import StoreSkeleton from '../common/skeleton/store-skeleton';
import Spinner from '../ui/spinner';
import TabEmpty from './tab-empty';

const TabStore = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const searchParams = useSearchParams();

  const {
    data: storeData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  } = useStudioStoreListQuery(id, {
    sort: searchParams.get('sort') || undefined,
    useRange: searchParams.get('useRange') || undefined,
    category: searchParams.get('category') || undefined,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const storeList = storeData?.list || [];
  const isLength = storeList.length > 0;

  const isMe = id === myInfo?.studioId;

  return (
    <>
      <>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-[10px]">
            <SearchTagFilter
              queryKey="useRange"
              queryValue={useRangeDict.get('en').nonProfit}
            >
              비상업용
            </SearchTagFilter>
            <SearchTagFilter
              queryKey="useRange"
              queryValue={useRangeDict.get('en').profit}
            >
              상업용
            </SearchTagFilter>
            <CategoryDropDown />
          </span>
          <span>
            <SortOrder sortList={COMMON_SORTS} />
          </span>
        </div>
        <ul className="grid grid-cols-4 gap-x-[20px] gap-y-[50px] mt-[50px]">
          {isLoading ? (
            <>
              <StoreSkeleton />
              <StoreSkeleton />
              <StoreSkeleton />
              <StoreSkeleton />
            </>
          ) : (
            <>
              {storeList?.map((product) => (
                <li key={product.productId}>
                  <ProductCard
                    {...product}
                    bookmarkSize={40}
                  />
                </li>
              ))}
            </>
          )}
        </ul>
        {isRefetching && (
          <div className="w-full flex items-center justify-center mt-5">
            <Spinner className="size-[40px]" />
          </div>
        )}
        <div ref={ref} />
      </>

      {!isLoading && !isLength && (
        <TabEmpty
          title="등록된 커미션이 없어요"
          buttonTitle="커미션 등록하러 가기"
          path={PATH.workCreate}
          isMe={isMe}
        />
      )}
    </>
  );
};

export default TabStore;
