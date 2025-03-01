'use client';

import {
  Carousel,
  CarouselContent,
  CarouselCount,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { chunkArray } from '@/lib/utils';
import { homeQueryKey } from '@/service/home/query-option';
import { useRecommendWorkQuery } from '@/service/home/use-service';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { IProduct } from '@/types/common';
import { IRecommendWork } from '@/types/home';

import { ProductCard } from '../common/product-card';
import SectionTitle from './section-title';
import HomeWorkSkeleton from './skeleton/work-skeleton';

const WhatAboutTheseWorks = () => {
  const { data: workData, isLoading } = useRecommendWorkQuery();

  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();
  const { mutate } = useWorkScrapMutation();

  const onScrapClick = (id: string, isScrapping: boolean) => {
    const prevData = setQueriesData<IRecommendWork>(
      {
        queryKey: homeQueryKey.recommendWork(),
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

  const moibleList = chunkArray<IProduct>(workData?.list || [], 4);

  return (
    <section className="mt-[63px]">
      {/* mobile */}
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 1,
        }}
        className="pc-screen:hidden"
      >
        <div className="flex w-full items-center justify-between">
          <SectionTitle>이런 작품은 어때요?</SectionTitle>
        </div>
        {isLoading ? (
          <HomeWorkSkeleton />
        ) : (
          <CarouselContent className="mt-[20px]">
            {moibleList.map((row, rowIndex) => (
              <CarouselItem
                key={rowIndex}
                className=" grid grid-cols-2 gap-y-5 gap-x-3"
              >
                {row.map((item, i) => (
                  <ProductCard
                    {...item}
                    key={item.productId + rowIndex + i}
                    bookmarkSize={40}
                    onScrapClick={() =>
                      onScrapClick(item.productId, item.isScrapping)
                    }
                  />
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
      </Carousel>

      {/* desktop */}
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 4,
        }}
        className="w-full hidden pc-screen:block"
      >
        <div className="flex w-full items-center justify-between">
          <SectionTitle>이런 작품은 어때요?</SectionTitle>
          <div className="flex gap-x-2 items-center">
            <CarouselCount />
            <div className="mt-2">
              <CarouselPrevious className="w-10 h-10 rounded-r-none" />
              <CarouselNext className="w-10 h-10 rounded-l-none border-l-0" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <HomeWorkSkeleton />
        ) : (
          <CarouselContent className="mt-[20px]">
            {workData?.list?.map((work, i) => (
              <CarouselItem
                key={work.productId + i}
                className="basis-1/4"
              >
                <ProductCard
                  {...work}
                  bookmarkSize={40}
                  onScrapClick={() =>
                    onScrapClick(work.productId, work.isScrapping)
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
      </Carousel>
    </section>
  );
};

export default WhatAboutTheseWorks;
