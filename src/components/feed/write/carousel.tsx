'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { UntitledIcon } from '@/components/icon';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BLUR_IMG } from '@/constants/common';
import { cn } from '@/lib/utils';
import { useFeedWriteActions, useFeedWriteStates } from '@/store/feed/write';
import { CAROUSEL_MOVE_BUTTON } from '@/styles/feed';

import FeedProductTag from './product-tag';
import FeedWriteTag from './write-tag';

export const FeedWriteCarousel = ({
  setApi,
  readOnly,
}: {
  setApi?: (api: CarouselApi) => void;
  readOnly?: boolean;
}) => {
  const { selectedFileInfos } = useFeedWriteStates();
  const { addTagPosition, deleteFileInfo, setStep } = useFeedWriteActions();

  const elementRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [openPopovers, setOpenPopovers] = useState<boolean[][]>([]);

  useEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);

  const calculateTagPosition = (
    event: React.MouseEvent<HTMLDivElement>,
    element: DOMRect
  ) => {
    const posX = (event.clientX - element.left) / element.width;
    const posY = (event.clientY - element.top) / element.height;
    return { posX, posY };
  };

  const shouldHandleClick = (idx: number) => {
    return !(readOnly || openPopovers[idx]?.some(Boolean));
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    if (!shouldHandleClick(idx)) return;

    const currentTarget = event.currentTarget as HTMLDivElement;
    const targetRect = currentTarget.getBoundingClientRect();

    const { posX, posY } = calculateTagPosition(event, targetRect);

    addTagPosition({ idx, posX, posY });
  };

  const handlePopoverOpen = (carouselIndex: number, popoverIndex: number) => {
    setOpenPopovers((prev) => {
      const newState = [...prev];
      if (!newState[carouselIndex]) {
        newState[carouselIndex] = [];
      }
      newState[carouselIndex][popoverIndex] = true;
      return newState;
    });
  };

  const handlePopoverClose = (carouselIndex: number, popoverIndex: number) => {
    setOpenPopovers((prev) => {
      const newState = [...prev];
      if (newState[carouselIndex]) {
        newState[carouselIndex][popoverIndex] = false;
      }
      return newState;
    });
  };

  useEffect(() => {
    if (selectedFileInfos.length <= 0) {
      setStep(1);
    }
  }, [selectedFileInfos]);

  return (
    <Carousel
      setApi={setApi}
      className="mx-auto max-w-[500px] border border-slate-200 rounded-[6px]"
    >
      <CarouselContent>
        {selectedFileInfos.map((info, fileIdx) => (
          <CarouselItem
            ref={elementRef}
            key={info.feedImageId}
            className="size-[500px] relative rounded-[6px] overflow-hidden aspect-square"
            onClick={(e) => handleClick(e, fileIdx)}
          >
            {readOnly ? (
              <button
                onClick={() => {
                  deleteFileInfo(fileIdx);
                }}
                className="absolute flex items-center justify-center  top-[10px] right-[10px] p-1 bg-[#71768066]/40 rounded-full z-20 cursor-pointer"
              >
                <UntitledIcon.X className="size-[14px]" />
              </button>
            ) : null}
            <Image
              fill
              src={info.feedImageUrl}
              alt={'feed' + fileIdx}
              placeholder="blur"
              blurDataURL={BLUR_IMG}
              sizes="500px"
              style={{
                objectFit: 'contain',
              }}
              className="aspect-square"
            />
            {!readOnly &&
              info.products?.map((product, tagIdx) => {
                return product.productId ? (
                  <FeedProductTag
                    key={product.productId}
                    product={product}
                    posY={product.positionY}
                    posX={product.positionX}
                    size={size.width}
                    fileIdx={fileIdx}
                    tagIdx={tagIdx}
                    isOpen={openPopovers[fileIdx]?.[tagIdx] || false}
                    onOpenChange={(open) => {
                      if (open) handlePopoverOpen(fileIdx, tagIdx);
                      else handlePopoverClose(fileIdx, tagIdx);
                    }}
                    onClose={() => handlePopoverClose(fileIdx, tagIdx)}
                  />
                ) : !readOnly ? (
                  <FeedWriteTag
                    key={product.positionX + product.positionY}
                    posY={product.positionY}
                    posX={product.positionX}
                    size={size.width}
                    fileIdx={fileIdx}
                    tagIdx={tagIdx}
                    isOpen={openPopovers[fileIdx]?.[tagIdx] || true}
                    onOpenChange={(open) => {
                      if (open) handlePopoverOpen(fileIdx, tagIdx);
                      else handlePopoverClose(fileIdx, tagIdx);
                    }}
                    onClose={() => handlePopoverClose(fileIdx, tagIdx)}
                  />
                ) : null;
              })}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute w-full flex justify-start top-1/2 px-[20px] z-10 ">
        <CarouselPrevious
          className={cn(
            CAROUSEL_MOVE_BUTTON,
            'absolute top-1/2 -translate-y-1/2 left-[20px] z-10'
          )}
        />
      </div>
      <CarouselNext
        className={cn(
          CAROUSEL_MOVE_BUTTON,
          'absolute top-1/2 -translate-y-1/2 right-[20px] z-10'
        )}
      />
      <div className="absolute w-full bottom-[20px] z-10">
        <CarouselDots className="mx-auto" />
      </div>
    </Carousel>
  );
};
