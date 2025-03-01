'use client';

import RecommendPickCategory from '@/components/home/recommend-pick-category';
import SectionTitle from '@/components/home/section-title';
import {
  Carousel,
  CarouselContent,
  CarouselCount,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { COMMON_CATEGORIES } from '@/constants/common';
import { useRecommendPickQuery } from '@/service/home/use-service';
import { faker } from '@faker-js/faker';

import RecommendSkeleton from './skeleton/recommend-skeleton';

const RecommendPick = () => {
  const { data: picks, isLoading } = useRecommendPickQuery();

  return (
    <section className="mt-[63px]">
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-between">
          <SectionTitle>카테고리별 추천 픽</SectionTitle>
          <div className="gap-x-2 items-center hidden pc-screen:flex">
            <CarouselCount />
            <div className="mt-2 ">
              <CarouselPrevious className="w-10 h-10 rounded-r-none" />
              <CarouselNext className="w-10 h-10 rounded-l-none border-l-0" />
            </div>
          </div>
        </div>

        {!isLoading ? (
          <CarouselContent className="mt-[20px]">
            {picks?.map((pick) => {
              return (
                <CarouselItem
                  key={faker.string.uuid()}
                  className="basis-1/1 pc-screen:basis-1/2 max-w-dvw"
                >
                  <RecommendPickCategory
                    categoryName={
                      COMMON_CATEGORIES.find((el) => el.value === pick.category)
                        ?.label ?? ''
                    }
                    categoryItems={pick.products}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        ) : (
          <RecommendSkeleton />
        )}
        <div className="w-full mt-5 pc-screen:hidden">
          <CarouselDots />
        </div>
      </Carousel>
    </section>
  );
};

export default RecommendPick;
