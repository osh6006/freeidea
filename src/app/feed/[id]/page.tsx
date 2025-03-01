import FeedDetailContents from '@/components/feed/detail/contents';
import FeedDetailHeader from '@/components/feed/detail/detail-header';
import HeaderLogoAndUserMenu from '@/components/navbar/header-logo-and-user-menu';
import { metadataMap } from '@/lib/metadata';
import { feedDetailOption } from '@/service/feed/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const generateMetadata = metadataMap.feedDetail;

export default async function FeedDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(feedDetailOption(params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderLogoAndUserMenu />
      <FeedDetailHeader />
      <FeedDetailContents />
    </HydrationBoundary>
  );
}
