'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { cn, formatCurrency } from '@/lib/utils';
import { useFeedDetailQuery } from '@/service/feed/use-service';
import { CAROUSEL_MOVE_BUTTON } from '@/styles/feed';

const FeedTagCarousel = () => {
  const { id }: { id: string } = useParams();
  const { data: feedInfo } = useFeedDetailQuery(id);

  if (!feedInfo) {
    return null;
  }

  const allProducts =
    feedInfo?.feedImages.flatMap((image) => image.products) || [];

  if (allProducts.length <= 0) return null;

  return (
    <section className="my-[30px]">
      <div className="text-slate-800 typo-body-14-bold-100-tight">
        작품 태그 <strong>{allProducts.length}</strong>개
      </div>
      <Carousel
        className="w-full relative mt-[12px] flex "
        opts={{
          align: 'start',
          slidesToScroll: 5,
        }}
      >
        <CarouselPrevious
          className={cn(
            CAROUSEL_MOVE_BUTTON,
            'w-[24px] h-[24px] self-center mx-[20px]'
          )}
        />
        <CarouselContent>
          {allProducts.map(
            (
              { productId, productImageUrl, registerStatus, title, price },
              i
            ) => {
              const basisLength =
                allProducts.length >= 5 ? 5 : allProducts.length;
              return (
                <CarouselItem
                  key={productId}
                  style={{ flexBasis: `${100 / basisLength}%` }}
                >
                  <Link href={PATH.workDetail(productId)}>
                    <CardThumbnail className="relative w-[120px] aspect-square rounded-[6px] overflow-hidden cursor-pointer">
                      {registerStatus !== 'CREATED' && (
                        <div className="absolute w-full h-full z-10 bg-black/50 flex items-center justify-center text-white typo-title-24-bold-140-tight">
                          판매중단
                        </div>
                      )}
                      <CardThumbnailImage
                        fill
                        alt={productImageUrl + i}
                        src={productImageUrl}
                        sizes="120px"
                        placeholder="blur"
                        blurDataURL={BLUR_IMG}
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </CardThumbnail>

                    <div className="mt-[10px] typo-body-14-regular-150-tight line-clamp-1 max-w-[120px]">
                      {title}
                    </div>
                    <div className="mt-[6px] typo-body-14-bold-100-tight max-w-[120px]">
                      {formatCurrency(price)}원
                    </div>
                  </Link>
                </CarouselItem>
              );
            }
          )}
        </CarouselContent>
        <CarouselNext
          className={cn(
            CAROUSEL_MOVE_BUTTON,
            'w-[24px] h-[24px] self-center mx-[20px]'
          )}
        />
      </Carousel>
    </section>
  );
};

export default FeedTagCarousel;
