import Link from 'next/link';

import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { formatCurrency } from '@/lib/utils';
import { homeQueryKey } from '@/service/home/query-option';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { IAuthorCuration } from '@/types/home';

import { Icon } from '../icon';
import {
  Card,
  CardContent,
  CardThumbnail,
  CardThumbnailImage,
} from '../ui/card';

const CurationCard = ({
  title,
  curationImageUrl,
  description,
  products,
  studioId,
}: IAuthorCuration) => {
  const { mutate, isPending } = useWorkScrapMutation();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  const onScrapClick = (id: string, isScrapping: boolean) => {
    const prevData = setQueriesData<IAuthorCuration[]>(
      {
        queryKey: homeQueryKey.curation(),
      },
      (oldData) => {
        return oldData.map((curation) => ({
          ...curation,
          products: curation.products.map((product) =>
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
    <Card className="overflow-hidden border flex flex-col h-full cursor-pointer border-none shadow-none">
      <Link href={PATH.studio(studioId)}>
        <CardThumbnail className="relative h-[285px] p-0 aspect-square rounded-[8px] overflow-hidden">
          {curationImageUrl ? (
            <CardThumbnailImage
              src={curationImageUrl}
              alt="productThumbnail"
              fill
              placeholder="blur"
              blurDataURL={BLUR_IMG}
              className="h-full w-full hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-[285px] aspect-square bg-[#D4D4D4]"></div>
          )}
        </CardThumbnail>
      </Link>

      <CardContent className="p-0 gap-0">
        <div className="text-slate-800 font-bold text-[16px] translate-[-0.32px]">
          {title}
        </div>
        <div className="mt-[10px] text-[14px] leading-[150%] tracking-base text-slate-800 break-keep">
          {description}
        </div>
        <ul className="space-y-[10px] mt-[20px]">
          {products.map((product) => (
            <li
              key={product.productId}
              className="flex items-center justify-between gap-x-[10px]"
            >
              <Link href={PATH.workDetail(product.productId)}>
                <span className="flex items-center gap-[10px]">
                  <CardThumbnail className="w-[60px] h-[60px] border min-w-[60px]">
                    <CardThumbnailImage
                      fallback={<div className="size-full bg-slate-50" />}
                      src={product.productImageUrl}
                      alt="productImage"
                      placeholder="blur"
                      blurDataURL={BLUR_IMG}
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </CardThumbnail>
                  <div className="space-y-[2px] text-[14px] tracking-base ">
                    <div className="leading-[150%] line-clamp-1">
                      {product.title}
                    </div>
                    <div className="font-bold">
                      {formatCurrency(product.price)}원~
                    </div>
                  </div>
                </span>
              </Link>
              <button
                disabled={isPending}
                onClick={() =>
                  onScrapClick(product.productId, product.isScrapping)
                }
              >
                {product.isScrapping ? (
                  <Icon.BookmarkSelect
                    width={18}
                    height={18}
                  />
                ) : (
                  <Icon.Bookmark
                    width={18}
                    height={18}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CurationCard;
