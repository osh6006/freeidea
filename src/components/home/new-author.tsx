'use client';

import SectionTitle from '@/components/home/section-title';
import {
  Carousel,
  CarouselContent,
  CarouselCount,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useWindowSize from '@/hooks/use-window-size';
import { useNewAuthorQuery } from '@/service/home/use-service';

import ProfileHoverCard from '../common/profile-hover-card';
import NewAuthorSkeleton from './skeleton/new-author-skeleton';

const NewAuthor = () => {
  const { data, isLoading } = useNewAuthorQuery();

  const windowSize = useWindowSize();
  const sliceToScroll = windowSize?.width || 0 < 1366 ? 3 : 6;

  return (
    <section className="mt-[63px]">
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: sliceToScroll,
        }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-between mb-5">
          <SectionTitle>신규 작가</SectionTitle>
          <div className="gap-x-2 items-center hidden pc-screen:flex">
            <CarouselCount />
            <div className="mt-2">
              <CarouselPrevious className="w-10 h-10 rounded-r-none" />
              <CarouselNext className="w-10 h-10 rounded-l-none border-l-0" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <NewAuthorSkeleton />
        ) : (
          <CarouselContent>
            {data?.list.map((author) => (
              <CarouselItem
                key={author.studioId}
                className="basis-1/3 pc-screen:basis-1/6"
              >
                <div className="flex flex-col justify-center items-center gap-y-[10px]">
                  <div className="size-[110px] rounded-full flex items-center justify-center border border-slate-200 hover:border-primary hover:border-[3px]">
                    <ProfileHoverCard
                      size={96}
                      profileUrl={author.profileImageUrl}
                      studioId={author.studioId}
                      nickname={author.nickname}
                    />
                  </div>
                  <div className="typo-caption-12-regular-100 text-slate-800">
                    {author.nickname}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
      </Carousel>
    </section>
  );
};

export default NewAuthor;
