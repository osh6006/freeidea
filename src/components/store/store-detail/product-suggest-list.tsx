'use client';

import { ProductCard } from '@/components/common/product-card';
import Spinner from '@/components/ui/spinner';
import { storeQueryKey } from '@/service/store/query-option';
import { getStoreList } from '@/service/store/service';
import { useQuery } from '@tanstack/react-query';

import { useWorkDetailScrapMutation } from './hooks';

export default function ProductSuggestList() {
  const { scrapMutate } = useWorkDetailScrapMutation();

  const { data, isLoading } = useQuery({
    queryKey: storeQueryKey.list({ sort: 'RANDOM', limit: 4 }),
    queryFn: () => getStoreList({ sort: 'RANDOM', limit: 4 }),
  });

  if (isLoading) return <Spinner />;
  if (!data) return;

  return (
    <ul className="grid grid-cols-4 gap-x-[20px] mt-[20px]">
      {data.list.map((product) => (
        <ProductCard
          key={product.productId}
          {...product}
          onScrapClick={() =>
            scrapMutate(product.productId, !product.isScrapping)
          }
        />
      ))}
    </ul>
  );
}
