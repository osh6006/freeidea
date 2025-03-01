'use client';

import { useInView } from 'react-intersection-observer';

import Inner from '@/components/common/inner';
import { ProductCard } from '@/components/common/product-card';
import EmptySearchResult from '@/components/search-result/empty-search-result';
import SearchResultHeader from '@/components/search-result/header';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { searchQueryKey } from '@/service/search/query-option';
import { useSearchProductQuery } from '@/service/search/use-service';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { IProduct, TCategory, TSort, TUseRange } from '@/types/common';

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
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchProductQuery({
      keyword,
      sort,
      useRange,
      category,
    });

  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const { mutate } = useWorkScrapMutation();

  if (!data) return;

  const { flattenList: products, pages } = data;
  const { count } = pages[0];

  const handleScrap = (productId: string, isScrap: boolean) => {
    const prevData = setInfinitePageQueriesData<IProduct>(
      {
        queryKey: searchQueryKey.tabs('product'),
      },
      {
        target: (item) => item.productId === productId,
        updater: (item) => {
          return {
            ...item,
            isScrapping: !isScrap,
          };
        },
      }
    );

    mutate(
      {
        id: productId,
        isScrapping: !isScrap,
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  return (
    <main>
      <SearchResultHeader totalCount={count || 0} />
      <Inner
        maxWidth={1200}
        className="mt-[50px] mb-[200px]"
      >
        {products.length !== 0 ? (
          <ul className="grid grid-cols-4 gap-x-[20px] gap-y-[50px] mt-[20px] w-full ">
            {products.map((product) => (
              <li key={product.productId}>
                <ProductCard
                  {...product}
                  bookmarkSize={40}
                  onScrapClick={() =>
                    handleScrap(product.productId, product.isScrapping)
                  }
                />
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
