'use client';

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
import { Clock } from '@untitled-ui/icons-react';
import { format } from 'date-fns';

import { SecureLink } from '../common/secure-button';
import { Badge } from '../ui/badge';

interface IRequestCardProps extends IRequest {
  className?: string;
}

const RequestCard = ({
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
          `
          flex whitespace-nowrap 
          cursor-pointer justify-between p-[30px] border-[1px] border-slate-200 border-l-transparent 
          border-r-transparent 
          border-b-transparent 
          hover:bg-slate-50 transition-colors
        `,
          isDeadLineTime ? 'bg-slate-tint-5' : ''
        )}
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[12px]">
            <Badge variant={isDeadLineTime ? 'closedDeadline' : 'openDeadline'}>
              {formatDeadlineTimeDate(dueDate, isFinished)}
            </Badge>
            <div className="text-slate-500 text-[12px] font-[700]">
              {findCategoryValueToLabel(category as TCategory)?.label || ''}
            </div>
          </div>
          <div className="text-[#1D2027] text-[20px] font-[700]">{title}</div>
          <div className="flex items-center gap-[20px]">
            <div className="flex gap-[4px]">
              <Eye
                className="untitled-icon text-slate-500"
                width={20}
                height={20}
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
            <div className="text-[12px] text-slate-500 font-[400] text-center">
              {`${formatRelativeDate(createdAt)}`}
            </div>
          </div>
        </div>

        <div className="pl-[30px] min-w-[360px]">
          <div className="flex flex-col gap-[22px] border-[1px] border-t-transparent border-b-transparent  border-r-transparent pl-[30px]">
            <div className="flex gap-[52px] items-center">
              <div className="flex gap-[4px] items-center">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.2 12.1333C7.2 13.1643 8.03574 14 9.06667 14H10.8C11.9046 14 12.8 13.1046 12.8 12C12.8 10.8954 11.9046 10 10.8 10H9.2C8.09543 10 7.2 9.10457 7.2 8C7.2 6.89543 8.09543 6 9.2 6H10.9333C11.9643 6 12.8 6.83574 12.8 7.86667M10 4.8V6M10 14V15.2M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
                      stroke="#717680"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[12px] text-slate-500 font-[400]">
                  예산
                </span>
              </div>
              <div className="text-[#262626] text-[12px] font-[700]">
                {isDiscussionPossible
                  ? '금액 협의'
                  : `${formatCurrency(budget)}원`}
              </div>
            </div>
            <div className="flex gap-[31px] items-center">
              <div className="flex gap-[4px] items-center">
                <span>
                  <svg
                    color="#717680"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.75 13C10.6495 13 13 10.6495 13 7.75C13 4.8505 10.6495 2.5 7.75 2.5C4.8505 2.5 2.5 4.8505 2.5 7.75C2.5 10.6495 4.8505 13 7.75 13Z"
                      stroke="#717680"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.25 17.5C15.1495 17.5 17.5 15.1495 17.5 12.25C17.5 9.3505 15.1495 7 12.25 7C9.3505 7 7 9.3505 7 12.25C7 15.1495 9.3505 17.5 12.25 17.5Z"
                      stroke="#717680"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[12px] text-slate-500 font-[400]">
                  사용범위
                </span>
              </div>
              <div className="text-[#262626] text-[12px] font-[700]">
                {findUseRangeValue(useRange[0] as TUseRange)}
              </div>
            </div>
            <div className="flex gap-[30px] items-center">
              <div className="flex gap-[4px] items-center">
                <span>
                  <Clock
                    className="untitled-icon"
                    color="#717680"
                    width={20}
                    height={20}
                  />
                </span>
                <span className="text-[12px] text-slate-500 font-[400]">
                  마감기한
                </span>
              </div>
              <div className="text-[#262626] text-[12px] font-[700]">
                {format(dueDate, 'yy.MM.dd')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SecureLink>
  );
};

export default RequestCard;
