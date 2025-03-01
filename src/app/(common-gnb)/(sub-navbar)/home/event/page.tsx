import Inner from '@/components/common/inner';
import EventList from '@/components/home/event/list';
import { metadataMap } from '@/lib/metadata';
import { homeEventListOption } from '@/service/home/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const metadata = metadataMap.event;

export default async function EventPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    homeEventListOption({
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="pt-[50px] pb-[200px]">
        <Inner maxWidth={1200}>
          <EventList />
        </Inner>
      </main>
    </HydrationBoundary>
  );
}
