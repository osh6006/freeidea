'use client';

import { useInView } from 'react-intersection-observer';

import { ScrapProductCard } from '@/components/common/product-card';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { myScrapProductQueryKey } from '@/service/mypage/query-option';
import { useMyScrapProductListQuery } from '@/service/mypage/use-service';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { MyScrapProduct } from '@/types/mypage';

import { ScrapEmpty } from './scrap-empty';

const ScrapProduct = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMyScrapProductListQuery();

  const { mutate } = useWorkScrapMutation();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const { ref } = useInView({
    onChange: (inView) => {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (!data) return null;

  const productList = data.flattenList;

  const onScrapClick = (productId: string, isScrapping: boolean) => {
    const prevData = setInfinitePageQueriesData<MyScrapProduct>(
      {
        queryKey: myScrapProductQueryKey.lists(),
      },
      {
        target: (item) => item.productId === productId,
        updater: (item) => ({ ...item, isScrapping: !isScrapping }),
      }
    );

    mutate(
      { id: productId, isScrapping: !isScrapping },
      {
        onError: () => rollbackQueriesData(prevData),
      }
    );
  };

  return (
    <>
      {productList.length === 0 ? (
        <ScrapEmpty />
      ) : (
        <ul className="w-full grid grid-cols-3 gap-x-[20px] gap-y-[50px] mt-[20px] mb-[200px]">
          {productList.map(
            ({
              productId,
              title,
              price,
              nickname,
              productImageUrl,
              profileImageUrl,
              isScrapping,
              tags,
              registerStatus,
            }) => (
              <ScrapProductCard
                key={productId}
                nickname={nickname}
                title={title}
                price={price}
                productImageUrl={productImageUrl}
                profileImageUrl={profileImageUrl}
                isScrapping={isScrapping}
                tags={tags}
                registerStatus={registerStatus}
                productId={productId}
                onScrapClick={() => onScrapClick(productId, isScrapping)}
              />
            )
          )}
        </ul>
      )}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};

export default ScrapProduct;
