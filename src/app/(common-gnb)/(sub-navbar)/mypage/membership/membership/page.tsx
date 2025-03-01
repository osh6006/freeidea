import MyMembershipPaymentInfo from '@/components/mypage/membership/membership-payment-info';
import MembershipUnregistButton from '@/components/mypage/membership/membership-unregist-button';
import { myMembershipPaymentQueryOption } from '@/service/mypage/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

interface Props {
  searchParams: { page?: string; endDate?: string; startDate?: string };
  params: { type: string };
}

export default async function Page({
  searchParams: { page, endDate, startDate },
}: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    myMembershipPaymentQueryOption({
      page: page ? Number(page) : undefined,
      endDate,
      startDate,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-[60px] mt-[40px]">
        <MyMembershipPaymentInfo />
        <MembershipUnregistButton />
      </div>
    </HydrationBoundary>
  );
}
