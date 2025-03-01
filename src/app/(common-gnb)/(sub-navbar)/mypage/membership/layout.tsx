import { ReactNode } from 'react';

import MembershipInfo from '@/components/mypage/membership/membership-info';
import MembershipNav from '@/components/mypage/membership/membership-nav';
import { Separator } from '@/components/ui/separator';
import { myMembershipQueryOption } from '@/service/mypage/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(myMembershipQueryOption);

  return (
    <main className="pl-[40px] pt-[40px] flex flex-col gap-[20px]">
      <h1 className="typo-title-18-bold-100 mb-[16px]">멤버십 관리</h1>
      <Separator />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MembershipInfo />
      </HydrationBoundary>
      <MembershipNav />
      {children}
    </main>
  );
}
