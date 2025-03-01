'use client';

import React from 'react';

import Link from 'next/link';

import { membershipVariants } from '@/components/common/membership';
import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useMyMembership } from '@/service/mypage/use-service';
import { formatDate } from 'date-fns';

function MembershipInfo() {
  const { data } = useMyMembership();

  if (!data) return;

  const { finishedAt, startedAt, membershipType } = data;

  const MEMBERSHIP = {
    FREE: {
      badge: 'FREE',
      label: '프리 멤버십',
      className: membershipVariants({ variant: 'free' }),
    },
    LITE: {
      badge: 'Lite',
      label: '라이트 멤버십',
      className: membershipVariants({ variant: 'lite' }),
    },
    PLUS: {
      badge: 'Plus',
      label: '플러스 멤버십',
      className: membershipVariants({ variant: 'plus' }),
    },
    VIP: {
      badge: 'VIP',
      label: 'VIP 멤버십',
      className: membershipVariants({ variant: 'vip' }),
    },
  } as const;

  const myMembership = MEMBERSHIP[membershipType];

  const { reservedMembership } = data;

  const reservedMembershipLabel =
    reservedMembership?.membershipType &&
    MEMBERSHIP[reservedMembership?.membershipType].badge;

  const reservedMembershipStartedAt =
    reservedMembership?.startedAt &&
    formatDate(reservedMembership?.startedAt, 'yyyy년 MM월 dd일');

  return (
    <>
      {reservedMembershipLabel && reservedMembershipStartedAt && (
        <div className="bg-pink-50 p-[10px] flex items-center gap-[6px]">
          <UntitledIcon.CheckCircle className="size-[18px]" />
          <span>
            멤버십이 {reservedMembershipLabel}로 {reservedMembershipStartedAt}에
            변경됩니다.
          </span>
        </div>
      )}
      <div className="bg-slate-50 flex justify-between items-center p-[20px]">
        <div className=" flex flex-col gap-[21px] ">
          <div>보유중인 멤버십</div>
          <div className="flex items-center gap-[10px]">
            <div
              className={cn(
                'p-[10px] typo-title-18-bold-100 w-fit border rounded-[4px]',
                myMembership.className
              )}
            >
              {myMembership.badge}
            </div>
            <span className="typo-title-24-bold-tight">
              {myMembership.label}
            </span>
          </div>
          <div className="typo-body-14-medium-100-tight">
            <strong>사용 가능 기간: </strong>

            <span>
              {membershipType === 'FREE' ? (
                'FREE'
              ) : (
                <>
                  {formatDate(startedAt, 'yyyy.MM.dd')} ~{' '}
                  {formatDate(finishedAt, 'yyyy.MM.dd')}
                </>
              )}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          asChild
        >
          <Link href={PATH.membershipIntro}>멤버십 변경하기</Link>
        </Button>
      </div>
    </>
  );
}

export default MembershipInfo;
