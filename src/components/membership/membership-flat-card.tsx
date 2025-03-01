'use client';

import Link from 'next/link';

import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useMyPageProfileQuery } from '@/service/mypage/use-service';
import { MembershipType } from '@/types/membership';

import { membershipVariants } from '../common/membership';

export const STYLE: { [key in MembershipType]: string } = {
  FREE: membershipVariants({ variant: 'free', className: 'border-none' }),
  LITE: membershipVariants({ variant: 'lite', className: 'border-none' }),
  PLUS: membershipVariants({ variant: 'plus', className: 'border-none' }),
  VIP: membershipVariants({ variant: 'vip', className: 'border-none' }),
};

export default function MembershipFlatCard() {
  const { data } = useMyPageProfileQuery();
  if (!data) return null;

  const { membershipType } = data;

  return (
    <div
      className={cn(
        'w-full flex justify-between p-[10px] rounded-[4px]',
        STYLE[membershipType]
      )}
    >
      <span className="typo-body-14-semi-bold-100-tight">
        {MEMBERSHIP_OPTION[membershipType].title}
      </span>
      <Link
        href={PATH.membershipIntro}
        className="typo-caption-12-regular-100 text-slate-500"
      >
        혜택보기
      </Link>
    </div>
  );
}
