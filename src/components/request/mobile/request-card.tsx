'use client';

import { BlendIcon } from 'lucide-react';

import { SecureLink } from '@/components/common/secure-button';
import { UntitledIcon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { PATH } from '@/constants/path';
import { formatDeadlineTimeDate, formatRelativeDate } from '@/lib/date';
import {
  cn,
  findCategoryValueToLabel,
  findUseRangeValue,
  formatCurrency,
} from '@/lib/utils';
import { TCategory, TUseRange } from '@/types/common';
import { IRequest } from '@/types/request';
import { Eye } from '@untitled-ui/icons-react';
import { format } from 'date-fns';

interface IRequestCardProps extends IRequest {
  className?: string;
}

const MobileRequestCardtwStyles = {
  wrapper: `          
          px-5 py-6 cursor-pointer justify-between border-[1px] 
          border-slate-200 border-l-transparent border-r-transparent border-b-transparent 
          hover:bg-slate-50 transition-colors`,

  title: `typo-title-20-bold-140 text-left mt-2`,

  infoWrapper: `grid grid-cols-3 w-full bg-slate-tint-5 rounded-[10px] mt-4 p-5 `,
  info: `flex flex-col items-center gap-y-[10px]`,
  infoAfter: (className: string) =>
    `${className} relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-px after:bg-slate-100`,
  infoTitle: `typo-body-14-bold-100-tight`,
  infoDescWrapper: `flex gap-1 items-center`,
  infoDesc: `typo-caption-12-regular-100 text-slate-500`,
  infoIcon: `size-3`,
  seperator: ``,

  footer: `flex items-center justify-between mt-[18px]`,
};

const RequestMobileCard = ({
  inquiryId,
  dueDate,
  createdAt,
  category,
  title,
  budget,
  useRange,
  viewCount,
  isDiscussionPossible,
  isFinished,
  className,
}: IRequestCardProps) => {
  const isDeadLineTime =
    formatDeadlineTimeDate(dueDate, isFinished) === '모집 마감';

  return (
    <SecureLink
      requiredLevel="USER"
      href={PATH.requestDetail(inquiryId)}
      className={cn('', className)}
    >
      <div
        className={cn(
          MobileRequestCardtwStyles.wrapper,
          isDeadLineTime ? 'bg-slate-tint-5' : ''
        )}
      >
        <div className="flex items-center gap-3">
          <Badge variant={isDeadLineTime ? 'closedDeadline' : 'openDeadline'}>
            {formatDeadlineTimeDate(dueDate, isFinished)}
          </Badge>
          <div className="text-slate-500 typo-caption-12-regular-100">
            {findCategoryValueToLabel(category as TCategory)?.label || ''}
          </div>
        </div>
        <div className={MobileRequestCardtwStyles.title}>{title}</div>

        <div className={MobileRequestCardtwStyles.infoWrapper}>
          <div
            className={MobileRequestCardtwStyles.infoAfter(
              MobileRequestCardtwStyles.info
            )}
          >
            <div className={MobileRequestCardtwStyles.infoTitle}>
              {isDiscussionPossible
                ? '금액 협의'
                : `${formatCurrency(budget)}원`}
            </div>
            <div className={MobileRequestCardtwStyles.infoDescWrapper}>
              <UntitledIcon.CurrencyDollarCircle
                className={MobileRequestCardtwStyles.infoIcon}
              />
              <span className={MobileRequestCardtwStyles.infoDesc}>예산</span>
            </div>
          </div>

          <div
            className={MobileRequestCardtwStyles.infoAfter(
              MobileRequestCardtwStyles.info
            )}
          >
            <div className={MobileRequestCardtwStyles.infoTitle}>
              {findUseRangeValue(useRange[0] as TUseRange)}
            </div>
            <div className={MobileRequestCardtwStyles.infoDescWrapper}>
              <BlendIcon className={MobileRequestCardtwStyles.infoIcon} />
              <span className={MobileRequestCardtwStyles.infoDesc}>
                사용범위
              </span>
            </div>
          </div>

          <div className={MobileRequestCardtwStyles.info}>
            <div className={MobileRequestCardtwStyles.infoTitle}>
              {format(dueDate, 'yy.MM.dd')}
            </div>
            <div className={MobileRequestCardtwStyles.infoDescWrapper}>
              <UntitledIcon.Clock
                className={MobileRequestCardtwStyles.infoIcon}
              />
              <span className={MobileRequestCardtwStyles.infoDesc}>
                마감기한
              </span>
            </div>
          </div>
        </div>
        <div className={MobileRequestCardtwStyles.footer}>
          <div className="text-[12px] text-slate-500 font-[400] text-center">
            {`${formatRelativeDate(createdAt)}`}
          </div>
          <div className="flex gap-[4px]">
            <UntitledIcon.Eye
              width={16}
              height={16}
            />
            <div className="flex items-center gap-[6px]">
              <span className="text-[12px] text-slate-500 font-[400]">
                조회수
              </span>
              <span className="text-[12px] text-slate-500 font-[700]">
                {viewCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SecureLink>
  );
};

export default RequestMobileCard;
