'use client';

import { PropsWithChildren } from 'react';

import { redirect, usePathname } from 'next/navigation';

import PaymentProgressBar from '@/components/common/payment/payment-progress-bar';
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  /**
   * Portone 검사로 인한 임시로직
   */
  const { data: myInfo } = useMyInfoQuery();

  const ALLOW_USER_IDS = [
    'ba3dfcbb-6846-4144-8d7f-8786a4df3744',
    '826cd63e-f4b8-40ed-b966-3a292241177a',
  ];
  const isAllowedUser = ALLOW_USER_IDS.includes(myInfo?.userId ?? '');

  if (!isAllowedUser) {
    return redirect(PATH.unauthorized);
  }

  return (
    <>
      <PaymentProgressBar
        className="mt-[50px] mb-[30px]"
        progress={pathname === PATH.membershipPayment ? 'payment' : 'complete'}
      />
      {children}
    </>
  );
}
