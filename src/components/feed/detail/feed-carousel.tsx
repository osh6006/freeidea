'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BLUR_IMG } from '@/constants/common';
import { cn } from '@/lib/utils';
import { useFeedDetailQuery } from '@/service/feed/use-service';
import { CAROUSEL_MOVE_BUTTON } from '@/styles/feed';

import DetailImgTag from './detail-img-tag';

const FeedCarousel = () => {
  const { id }: { id: string } = useParams();
  const { data: feedInfo } = useFeedDetailQuery(id);

  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setSize(width);
    }
  }, []);

  if (!feedInfo) {
    return null;
  }

  const images = feedInfo.feedImages;

  return (
    <Carousel className="w-full relative">
      <div className="absolute w-full flex justify-start top-1/2 px-[20px] z-10 ">
        <CarouselPrevious
          className={cn(
            CAROUSEL_MOVE_BUTTON,
            'absolute top-1/2 left-[20px] z-10'
          )}
        />
      </div>
      <CarouselNext
        className={cn(
          CAROUSEL_MOVE_BUTTON,
          'absolute top-1/2 right-[20px] z-10'
        )}
      />

      <div className="absolute w-full bottom-[20px] z-10">
        <CarouselDots className="mx-auto" />
      </div>

      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem
            key={image.feedImageId}
            className="relative "
          >
            <div
              ref={ref}
              className="p-1 relative w-full max-w-[720px] aspect-square rounded-[6px] overflow-hidden"
            >
              <Image
                src={image.feedImageUrl}
                alt={'feed' + i}
                fill
                placeholder="blur"
                blurDataURL={BLUR_IMG}
                sizes="1000px"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            {image.products.map((product) => {
              return (
                <DetailImgTag
                  {...product}
                  size={size}
                  key={product.productId}
                />
              );
            })}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FeedCarousel;
