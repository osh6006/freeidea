'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { useUnRegistMembershipMutation } from '@/service/membership/use-service';
import { useMyMembership } from '@/service/mypage/use-service';
import { Check, ChevronRight } from '@untitled-ui/icons-react';
import { formatDate } from 'date-fns';

export default function MembershipUnregistButton() {
  const [api, setApi] = useState<CarouselApi>();
  const { data } = useMyMembership();

  if (data?.membershipType === 'FREE') return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="typo-body-16-medium-100-tight self-end flex gap-1 items-center text-slate-500">
          멤버십 해지신청 <ChevronRight className="size-[18px]" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <Carousel setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <DialogContentStep1
                onUnregistSuccess={() => {
                  api?.scrollNext();
                }}
              />
            </CarouselItem>
            <CarouselItem>
              <DialogContentStep2 />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}

function DialogContentStep1({
  onUnregistSuccess,
}: {
  onUnregistSuccess: () => void;
}) {
  const { data } = useMyMembership();
  const { mutate, isPending } = useUnRegistMembershipMutation();

  if (!data) return;

  const option = MEMBERSHIP_OPTION[data.membershipType];

  const onUnregistClick = () => {
    mutate(undefined, {
      onSuccess: onUnregistSuccess,
    });
  };

  return (
    <>
      <DialogTitle className="flex flex-col items-center gap-3">
        <DialogHeader className="text-center typo-title-24-bold-140-tight">
          멤버십 해지 신청
        </DialogHeader>
        <DialogDescription className="text-center">
          해지하신다니 너무 아쉬워요
        </DialogDescription>
      </DialogTitle>
      <div className="flex flex-col items-center gap-[10px] py-[30px]">
        <span className="typo-title-18-bold-100">혜택 내용</span>
        <ul className="p-[20px] w-full flex flex-col gap-[15px] items-center bg-slate-50 border border-border rounded-[6px]">
          {option?.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-[6px] typo-body-14-medium-100-tight"
            >
              <Check className="size-[18px]" /> {benefit}
            </li>
          ))}
        </ul>
      </div>
      <DialogFooter className="flex flex-col gap-[10px]">
        <DialogClose asChild>
          <Button size="lg">멤버십 혜택 유지하기</Button>
        </DialogClose>
        <Button
          size="lg"
          className="w-full"
          variant="outline" // Todo. outline-pink
          onClick={onUnregistClick}
          disabled={isPending}
        >
          해지 신청하기
        </Button>
      </DialogFooter>
    </>
  );
}

function DialogContentStep2() {
  const { data } = useMyMembership();

  if (!data) return;
  const finishedDate = formatDate(data.finishedAt, 'MM월 dd일');

  return (
    <>
      <DialogTitle className="flex flex-col items-center gap-3">
        <DialogHeader className="text-center typo-title-24-bold-140-tight">
          멤버십 해지 신청 완료
        </DialogHeader>
        <DialogDescription className="text-center">
          해지 신청이 완료되었어요
        </DialogDescription>
      </DialogTitle>
      <div className="flex flex-col items-center gap-[10px] py-[30px]">
        <span className="typo-title-18-bold-100">혜택 내용</span>
        <ul className="p-[20px] w-full flex flex-col gap-[15px] items-center bg-slate-50 border border-border rounded-[6px]">
          {[
            `혜택은 ${finishedDate}까지 유지되며 이후 자동 해지됩니다.`,
            '멤버십은 언제든 다시 신청할 수 있습니다.',
          ].map((info) => (
            <li
              key={info}
              className="flex items-center gap-[6px] typo-body-14-medium-100-tight"
            >
              <Check className="size-[18px]" /> {info}
            </li>
          ))}
        </ul>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            size="lg"
            className="w-full"
          >
            확인
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
