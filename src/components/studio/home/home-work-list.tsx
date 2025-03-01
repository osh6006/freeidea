import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ProductCard } from '@/components/common/product-card';
import StoreSkeleton from '@/components/common/skeleton/store-skeleton';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { studioQueryKey } from '@/service/studio/query-option';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { IProduct } from '@/types/common';
import { IStudioWorkResponse } from '@/types/studio';

interface HomeWorkList {
  homeWorkList: IProduct[];
  totalCount: number;
  isLoading: boolean;
}

const HomeWorkList = ({
  homeWorkList,
  totalCount,
  isLoading,
}: HomeWorkList) => {
  const { id }: { id: string } = useParams();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();
  const { mutate } = useWorkScrapMutation();

  const onScrapClick = (id: string, isScrapping: boolean) => {
    const prevData = setQueriesData<IStudioWorkResponse>(
      {
        queryKey: studioQueryKey.store(),
      },
      (oldData) => {
        return {
          ...oldData,
          list: oldData.list.map((product) => {
            if (product.productId === id) {
              return {
                ...product,
                isScrapping: !isScrapping,
              };
            }
            return product;
          }),
        };
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
      <h2 className="typo-title-24-bold-140-tight mt-[50px]">
        업로드한 커미션
      </h2>
      <ul className="grid grid-cols-4 mt-[20px] gap-x-[20px]">
        {isLoading ? (
          <>
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
          </>
        ) : (
          <>
            {homeWorkList.map((product, i) => {
              const isLast = i === 3;

              return (
                <li
                  className="h-fit relative"
                  key={product.productId}
                >
                  {isLast && i >= 3 ? (
                    <Link
                      href={`${PATH.studio(id)}?tab=store`}
                      scroll={false}
                    >
                      <div className="relative overflow-hidden rounded-[6px]">
                        <Image
                          width={285}
                          height={285}
                          sizes="100vw"
                          src={product.productImageUrl}
                          alt="last-image"
                          className="aspect-square"
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white z-10 typo-title-32-bold-150 ">
                          + {totalCount - 4}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <ProductCard
                      {...product}
                      onScrapClick={() =>
                        onScrapClick(product.productId, product.isScrapping)
                      }
                      bookmarkSize={40}
                    />
                  )}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </>
  );
};

export default HomeWorkList;
