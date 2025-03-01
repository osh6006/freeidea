'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

import { ProductCard } from '@/components/common/product-card';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { storeQueryKey } from '@/service/store/query-option';
import { useStoreListquery } from '@/service/store/use-service';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { StoreType } from '@/types/store';

const StoreItemList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useStoreListquery();
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  const { mutate } = useWorkScrapMutation();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  if (!data) return;

  const { flattenList: storeList } = data;

  const onScrapClick = (id: string, isScrapping: boolean) => {
    const prevData = setInfinitePageQueriesData<StoreType>(
      {
        queryKey: storeQueryKey.lists(),
      },
      {
        target: (item) => item.productId === id,
        updater: (item) => ({ ...item, isScrapping: !isScrapping }),
      }
    );
    mutate(
      { id, isScrapping: !isScrapping },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  return (
    <>
      <ul className="w-full grid grid-cols-4 gap-x-[20px] gap-y-[50px] mt-[20px]">
        {storeList.map(
          ({
            productId,
            title,
            price,
            nickname,
            productImageUrl,
            profileImageUrl,
            isScrapping,
            tags,
            studioId,
          }) => (
            <ProductCard
              key={productId}
              title={title}
              price={price}
              nickname={nickname}
              productId={productId}
              productImageUrl={productImageUrl}
              profileImageUrl={profileImageUrl}
              isScrapping={isScrapping}
              tags={tags}
              studioId={studioId}
              bookmarkSize={40}
              onScrapClick={() => onScrapClick(productId, isScrapping)}
            />
          )
        )}
      </ul>
      {hasNextPage && <div ref={ref} />}
    </>
  );
};

export default StoreItemList;
