import Link from 'next/link';

import { categoryDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { homeQueryKey } from '@/service/home/query-option';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { IProduct } from '@/types/common';
import { ICategoryRecommend } from '@/types/home';
import { faker } from '@faker-js/faker';

import { ProductCard } from '../common/product-card';
import { buttonVariants } from '../ui/button';

interface IRecommendPickCategoryProps {
  categoryName: string;
  categoryItems: IProduct[];
}

const RecommendPickCategory = ({
  categoryName,
  categoryItems,
}: IRecommendPickCategoryProps) => {
  const { mutate } = useWorkScrapMutation();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  const onScrapClick = (id: string, isScrapping: boolean) => {
    const prevData = setQueriesData<ICategoryRecommend[]>(
      {
        queryKey: homeQueryKey.recommendPick(),
      },
      (oldData) => {
        return oldData.map((category) => ({
          ...category,
          products: category.products.map((product) =>
            product.productId === id
              ? { ...product, isScrapping: !isScrapping }
              : product
          ),
        }));
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
    <div className="p-[20px] border border-slate-200 rounded-[10px]">
      <div className="text-[14px] tracking-base font-medium text-slate-800">
        지금 뜨는{' '}
        <strong className="font-medium text-pink-500">{categoryName}</strong>{' '}
        작품
      </div>

      <ul className="grid grid-cols-2 gap-2 mt-[10px] pc-screen:grid-cols-3">
        {categoryItems.map((item) => (
          <div
            key={faker.string.uuid()}
            className="max-w-[150px] pc-screen:max-w-full"
          >
            <ProductCard
              {...item}
              bookmarkSize={25}
              onScrapClick={() =>
                onScrapClick(item.productId, item.isScrapping)
              }
            />
          </div>
        ))}
      </ul>

      <div className="mx-auto w-fit mt-[30px]">
        <Link
          href={`${PATH.storeList}?category=${categoryDict.getTranslator('ko-en').translate(categoryName)}`}
          className={buttonVariants({
            size: 'sm',
            className: 'h-8 w-[200px]',
            variant: 'outline',
          })}
        >
          더보기
        </Link>
      </div>
    </div>
  );
};

export default RecommendPickCategory;
