'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PATH } from '@/constants/path';
import { useQnaRectnlyListQuery } from '@/service/qna/use-service';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle01,
} from '@untitled-ui/icons-react';
import { format } from 'date-fns';

const QnaDetailRecentlyQna = () => {
  const router = useRouter();
  const { data: recentQnaList } = useQnaRectnlyListQuery();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [isMove, setIsMove] = useState({
    prev: false,
    next: false,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    const {
      on,
      scrollSnapList,
      selectedScrollSnap,
      canScrollNext,
      canScrollPrev,
    } = api;

    setCount(scrollSnapList().length);
    setCurrent(selectedScrollSnap() + 1);
    setIsMove(() => ({
      prev: !canScrollPrev(),
      next: !canScrollNext(),
    }));

    on('select', () => {
      setCurrent(selectedScrollSnap() + 1);
      setIsMove(() => ({
        prev: !canScrollPrev(),
        next: !canScrollNext(),
      }));
    });
  }, [api]);

  const handlePrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };
  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <div className="border border-slate-200 rounded-[10px] w-full p-[30px]">
      <div className="typo-body-16-bold-100-tight text-primary">
        최근에 올라온 Q&A
      </div>

      {recentQnaList && recentQnaList.length > 0 ? (
        <Carousel
          setApi={setApi}
          className="w-full "
        >
          <CarouselContent>
            {recentQnaList?.map((info) => (
              <CarouselItem key={info.id}>
                {info.data.map((answer) => (
                  <div
                    className="border-b  border-slate-200 pb-[20px] mt-[20px] cursor-pointer"
                    key={answer.qnaId}
                    onClick={() =>
                      router.push(PATH.loungeQnaDetail(answer.qnaId))
                    }
                  >
                    <div className="line-clamp-1">{answer.title}</div>
                    <div className=" flex justify-between items-center">
                      <span>
                        {format(answer.createdAt, 'yyyy.MM.dd hh:mm')}
                      </span>
                      <span className="flex gap-x-2">
                        <span className="flex items-center">
                          <Eye className="size-[16px]" /> {answer.viewCount}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle01 className="size-[16px]" />{' '}
                          {answer.answers}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center typo-body-14-medium-100-tight bgre text-slate-500 mt-[20px] ">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full size-[20px] disabled:bg-slate-100"
              onClick={handlePrev}
              disabled={isMove.prev}
            >
              <ChevronLeft />
            </Button>
            <span className="flex items-center mx-5 gap-x-0.5">
              <span className="text-primary"> {current}</span>
              <span>/</span>
              <span>{count}</span>
            </span>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full size-[20px] disabled:bg-slate-100"
              onClick={handleNext}
              disabled={isMove.next}
            >
              <ChevronRight />
            </Button>
          </div>
        </Carousel>
      ) : (
        <div className="flex items-center justify-center mt-[30px] bg-slate-50 typo-body-14-bold-100-tight h-[164px]">
          아직 등록된 Q&A가 없어요
        </div>
      )}
    </div>
  );
};

export default QnaDetailRecentlyQna;
