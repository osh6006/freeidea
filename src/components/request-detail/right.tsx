'use client';

import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { COMMON_CATEGORIES } from '@/constants/common';
import { formatDeadlineTimeDate } from '@/lib/date';
import { findUseRangeValue, formatCurrency } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useRequestDetailQuery } from '@/service/request/use-service';
import { TUseRange } from '@/types/common';
import { DialogTitle } from '@radix-ui/react-dialog';
import { format } from 'date-fns';

import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import RequestDetailActionButtons from './action-buttons';

const ContentsRight = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();

  const { data } = useRequestDetailQuery(id);

  if (!data) {
    return null;
  }

  const {
    userId,
    inquiryId,
    dueDate,
    isFinished,
    category,
    budget,
    isDiscussionPossible,
    useRange,
    usePurpose,
  } = data;

  const deadLineDayKor = formatDeadlineTimeDate(dueDate, isFinished);
  const isDeadLineTime = deadLineDayKor === '모집 마감';

  return (
    <div className="flex flex-col w-[410px] h-fit rounded-[4px] gap-[35px] border-[1px] border-slate-200 p-[30px]">
      <div className="flex flex-col gap-[15px]">
        <Badge className="bg-white w-fit border-[1px] font-[400] mb-[10px] hover:bg-white hover:text-slate-500 border-slate-500 text-[14px] h-[30px] px-[10px] whitespace-nowrap py-[4px] rounded-[4px] text-slate-500">
          {COMMON_CATEGORIES.find((el) => el.value === category)?.label}
        </Badge>
        <div className="flex flex-col">
          <div className="text-[14px] text-slate-300 font-medium">예산</div>
          <div className="text-[20px] text-slate-800 font-[700]">
            {isDiscussionPossible ? '금액 협의' : `${formatCurrency(budget)}원`}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] text-slate-300 font-medium">사용범위</div>
          <div className="text-[20px] text-slate-800 font-[700]">
            {findUseRangeValue((useRange[0] as TUseRange) || '')}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] text-slate-300 font-medium">사용목적</div>
          <div className="text-[20px] text-slate-800 font-[700]">
            {usePurpose}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] text-slate-300 font-medium">마감기한</div>
          <div className="flex items-center gap-[20px]">
            <div className="text-[20px] text-slate-800 font-[700]">
              {format(dueDate, 'yy.MM.dd')}
            </div>
            <Badge
              className="font-[400] text-[12px] cursor-default"
              variant={isFinished === false ? 'openDeadline' : 'closedDeadline'}
            >
              {deadLineDayKor}
            </Badge>
          </div>
        </div>
      </div>
      {myInfo?.userId !== userId && !isDeadLineTime && (
        <RequestDetailActionButtons inquiryId={inquiryId} />
      )}

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>로그인 후 가능합니다.</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentsRight;
