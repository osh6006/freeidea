import Link from 'next/link';

import MyStoreList from '@/components/mypage/store/my-store-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { myProductsQueryOption } from '@/service/mypage/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams = { page: undefined, isPending: 'true' },
}: {
  searchParams: { page?: string; isPending?: string };
}) {
  const queryClient = new QueryClient();
  const page = searchParams.page ? Number(searchParams.page) : undefined;
  const isPending = searchParams.isPending === 'true';

  await queryClient.prefetchQuery(myProductsQueryOption({ page, isPending }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="pl-[40px] pt-[40px] mb-[200px] flex flex-col gap-[20px]">
        <div>
          <h1 className="typo-title-24-bold-tight mb-[16px]">나의 판매글</h1>
          <Separator />
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant={isPending ? 'outline' : 'accent'}
            className="w-[180px] rounded-r-none"
            asChild
          >
            <Link href={{ query: { isPending: 'false' } }}>판매슬롯</Link>
          </Button>
          <Button
            variant={isPending ? 'accent' : 'outline'}
            className="w-[180px] rounded-l-none"
            asChild
          >
            <Link href={{ query: { isPending: 'true' } }}>대기슬롯</Link>
          </Button>
        </div>
        <MyStoreList />
      </main>
    </HydrationBoundary>
  );
}
