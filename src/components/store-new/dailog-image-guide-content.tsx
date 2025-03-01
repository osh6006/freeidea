'use client';

import { UIEventHandler, useEffect, useState } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useTermStore } from '@/store/work-new';
import { CheckCircle, MinusCircle } from '@untitled-ui/icons-react';

import { Button } from '../ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Separator } from '../ui/separator';

const ACCEPT_IMAGES = [
  {
    imgSrc: '/guide-images/accept1.png',
    title: '작업물은 한 장씩!',
    desc: '한 장에 한작업물을 넣는 것을 원칙으로 합니다.',
  },
  {
    imgSrc: '/guide-images/accept2.png',
    title: '작품이 잘보이게 깔끔, 심플!',
    desc: '복잡한 배경보단 심플한 단색사용 권장합니다.',
  },
  {
    imgSrc: '/guide-images/accept3.png',
    title: '분위기 컨셉이 잘 드러나는!',
    desc: '분위기 컨셉이 잘 드러나는 이미지를 올려주세요.',
  },
];

const REJECT_IMAGES = [
  {
    imgSrc: '/guide-images/reject1.png',
    title: '텍스트가 이미지보다 크게 불가!',
    desc: '텍스트는 이미지보다 작게 해주세요.',
  },
  {
    imgSrc: '/guide-images/reject2.png',
    title: 'CI, 회사명, 싸인 노출 불가',
    desc: '썸네일에 본인 CI, 회사명등 직접적인 홍보는 불가능해요.',
  },
  {
    imgSrc: '/guide-images/reject3.png',
    title: '텍스트만 들어간 이미지 불가',
    desc: '텍스트만 들어간 썸네일은 등록이 불가능해요.',
  },
];
interface ImageCardProps {
  mode: 'accept' | 'reject';
  imgSrc: string;
  title: string;
  desc: string;
}

const ImageCard = ({ imgSrc, mode, title, desc }: ImageCardProps) => {
  return (
    <div className="w-[266px] h-[386px] px-[45px] py-[40px] flex flex-col gap-[20px] items-center bg-slate-50 border-slate-100 border">
      <h2
        className={cn(
          'typo-body-14-bold-100-tight flex items-center',
          mode === 'accept' ? 'text-neonGreen-600' : 'text-error'
        )}
      >
        {mode === 'accept' ? (
          <>
            <CheckCircle className="size-[24px]" />
            <span className="ml-[6px]">등록이 가능한 이미지</span>
          </>
        ) : (
          <>
            <MinusCircle className="size-[24px]" />
            <span className="ml-[6px]">등록이 가능한 이미지</span>
          </>
        )}
      </h2>
      {mode === 'reject' && (
        <h2 className="typo-body-14-bold-100-tight text-error flex items-center"></h2>
      )}

      <Image
        src={imgSrc}
        alt=""
        width={176}
        height={176}
      />
      <div className="text-center space-y-[10px]">
        <h3 className="typo-body-14-bold-100-tight">{title}</h3>
        <div className="typo-body-14-regular-150-tight">{desc}</div>
      </div>
    </div>
  );
};

const DailogImageGuideContent = ({
  buttonActiveAlways = false,
}: {
  buttonActiveAlways?: boolean;
}) => {
  const { agree } = useTermStore();
  const [scrollYRatio, setScrollYRatio] = useState(0);
  const [buttonActive, setButtonActive] = useState(buttonActiveAlways);

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setScrollYRatio(scrollTop / (scrollHeight - clientHeight));
  };

  useEffect(() => {
    if (buttonActive || scrollYRatio < 0.8) return;
    setButtonActive(true);
  }, [scrollYRatio, buttonActive]);

  return (
    <DialogContent
      onScroll={handleScroll}
      className="h-[678px] overflow-y-scroll max-w-none w-[900px] p-0 gap-0"
    >
      <DialogHeader className="pt-[32px]">
        <DialogTitle className="text-center">판매 이미지 등록 기준</DialogTitle>
        <DialogDescription className=" typo- text-center">
          5초만에 이해할 수 있어요!
        </DialogDescription>
      </DialogHeader>
      <div className="p-[30px] pb-[40px] flex flex-col gap-[20px]">
        <div className="flex justify-between gap-[20px]">
          {ACCEPT_IMAGES.map((data) => (
            <ImageCard
              key={data.title}
              mode="accept"
              {...data}
            />
          ))}
        </div>
        <Separator />
        <div className="text-center typo-body-14-semi-bold-100-tight">
          지켜지지 않은 판매글은 관리자 검수 단계에서 수정 권고 및 삭제
          조치됩니다.
        </div>
        <div className="flex justify-between gap-[20px]">
          {REJECT_IMAGES.map((data) => (
            <ImageCard
              key={data.title}
              mode="reject"
              {...data}
            />
          ))}
        </div>
      </div>

      <DialogFooter className="sticky bottom-0 py-[24px] px-[30px] w-full bg-white border-t border-slate-200">
        <DialogClose asChild>
          <Button
            className="w-full"
            onClick={agree}
            disabled={!buttonActive}
          >
            확인 했습니다.
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DailogImageGuideContent;
