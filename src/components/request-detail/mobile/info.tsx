'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { COMMON_CATEGORIES } from '@/constants/common';
import { formatDeadlineTimeDate } from '@/lib/date';
import { findUseRangeValue, formatCurrency } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useRequestDetailQuery } from '@/service/request/use-service';
import { TUseRange } from '@/types/common';
import { format } from 'date-fns';

import { RequestDetailMobileActionButtons } from '../action-buttons';

const twStyles = {
  infoWrapper: `space-y-5 border rounded p-5 pc-screen:hidden`,
  infoTitleWrapper: `flex flex-col gap-y-[10px]`,
  infoTitle: `typo-body-14-medium-100-tight text-slate-500`,
  infoDesc: `typo-title-18-bold-100`,
};

const RequestDetailMobileInfo = () => {
  const { id }: { id: string } = useParams();
  const { data } = useRequestDetailQuery(id);

  const { data: myInfo } = useMyInfoQuery();

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
    <section className={twStyles.infoWrapper}>
      <Badge className="bg-white w-fit border border-slate-300 rounded text-slate-500 typo-body-14-regular-150-tight">
        {COMMON_CATEGORIES.find((el) => el.value === category)?.label}
      </Badge>
      <div className={twStyles.infoTitleWrapper}>
        <div className={twStyles.infoTitle}>예산</div>
        <div className={twStyles.infoDesc}>
          {isDiscussionPossible ? '금액 협의' : `${formatCurrency(budget)}원`}
        </div>
      </div>
      <div className={twStyles.infoTitleWrapper}>
        <div className={twStyles.infoTitle}>사용범위</div>
        <div className={twStyles.infoDesc}>
          {findUseRangeValue((useRange[0] as TUseRange) || '')}
        </div>
      </div>
      <div className={twStyles.infoTitleWrapper}>
        <div className={twStyles.infoTitle}>사용목적</div>
        <div className={twStyles.infoDesc}> {usePurpose}</div>
      </div>
      <div className={twStyles.infoTitleWrapper}>
        <div className={twStyles.infoTitle}>마감기한</div>
        <div className="flex items-center gap-x-2">
          <span className={twStyles.infoDesc}>
            {format(dueDate, 'yy.MM.dd')}
          </span>
          <Badge
            className="font-[400] text-[12px] cursor-default"
            variant={isFinished === false ? 'openDeadline' : 'closedDeadline'}
          >
            {deadLineDayKor}
          </Badge>
        </div>
      </div>
      {myInfo?.userId !== userId && !isDeadLineTime && (
        <RequestDetailMobileActionButtons inquiryId={inquiryId} />
      )}
      <RequestDetailMobileActionButtons inquiryId={inquiryId} />
    </section>
  );
};

export default RequestDetailMobileInfo;
