'use client';

import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { Input, inputVariant } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  requestDateRangeDict,
  requestPriceRangeDict,
} from '@/constants/dictionary';
import { cn } from '@/lib/utils';
import { useMyPageRequesterDetailQuery } from '@/service/mypage/use-service';

const MypageRequesterApplyDialog = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const { data, isLoading } = useMyPageRequesterDetailQuery(id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 w-[100px] typo-body-14-medium-100-tight">
          지원서
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100dvh-30px)] flex flex-col px-[10px] py-[10px]">
        <DialogHeader className="px-[10px] py-[10px]">
          <DialogTitle>의뢰 지원서</DialogTitle>
          <DialogDescription>{name}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full flex-1 px-[10px]">
          <div className="flex-1 my-[30px] space-y-[20px] p-0.5">
            <div className="space-y-[10px]">
              <Label>작품 URL</Label>
              <Link href={data?.urlAddress || '#'}>
                <div className={cn(inputVariant, 'p-2 h-fit mt-[10px]')}>
                  {data?.urlAddress}
                </div>
              </Link>
            </div>
            <div className="space-y-[10px]">
              <Label>작품 예상 금액</Label>
              <Input
                readOnly
                value={requestPriceRangeDict
                  .getTranslator('en-ko')
                  .translate(data?.estimatedBudget || '')}
              />
            </div>
            <div className="space-y-[10px]">
              <Label>작품 예상 소요일</Label>
              <Input
                readOnly
                value={requestDateRangeDict
                  .getTranslator('en-ko')
                  .translate(data?.estimatedDate || '')}
              />
            </div>
            <div className="space-y-[10px]">
              <Label>신청 메모</Label>
              <Textarea
                readOnly
                value={data?.urlAddress}
                className="h-[120px] resize-none"
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t border-slate-200 px-[10px] pt-[10px]">
          <DialogClose
            className={buttonVariants({
              className: 'w-full',
            })}
          >
            확인
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MypageRequesterApplyDialog;
