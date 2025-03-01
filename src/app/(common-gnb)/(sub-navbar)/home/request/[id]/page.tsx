import Inner from '@/components/common/inner';
import MobileBackbutton from '@/components/common/mobile/back-button';
import RequestDetailContents from '@/components/request-detail/contents';
import ContentsLeft from '@/components/request-detail/left';
import RequestDetailMobileContents from '@/components/request-detail/mobile/contents';
import ContentsRight from '@/components/request-detail/right';
import SuggestRequests from '@/components/request-detail/suggest-requests';
import { Separator } from '@/components/ui/separator';
import { metadataMap } from '@/lib/metadata';
import { requestDetailOption } from '@/service/request/query-option';
import { getRecentlyRequestData } from '@/service/request/service';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

interface IParams {
  params: {
    id: string;
  };
}

export const generateMetadata = metadataMap.requestDetail;

export default async function RequestPage({ params }: IParams) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(requestDetailOption(id));

  const restRequestList = await getRecentlyRequestData(id, {
    page: 1,
    limit: 3,
  });

  const recentNonExpiredCards = restRequestList?.list ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Inner
        maxWidth={1200}
        className="-mt-[30px] px-[20px] flex flex-col md:mt-0 pc-screen:gap-[60px] pc-screen::px-0"
      >
        {/* Mobile */}
        <MobileBackbutton className="px-0 " />
        <RequestDetailMobileContents />

        {/* Desktop */}
        <RequestDetailContents>
          <ContentsLeft />
          <ContentsRight />
        </RequestDetailContents>
      </Inner>
      <Separator className="h-2 bg-slate-50 w-full mb-6 pc-screen:hidden" />
      <SuggestRequests recentNonExpiredCards={recentNonExpiredCards} />
    </HydrationBoundary>
  );
}
