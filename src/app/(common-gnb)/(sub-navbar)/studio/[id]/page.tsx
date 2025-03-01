import Inner from '@/components/common/inner';
import StudioBanner from '@/components/studio/banner/studio-banner';
import StudioProfile from '@/components/studio/studio-profile';
import StudioTab from '@/components/studio/studio-tab';
import { metadataMap } from '@/lib/metadata';
import { studioProfileDetailOption } from '@/service/studio/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const generateMetadata = metadataMap.studio;

export default async function StudioPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(studioProfileDetailOption(params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="w-dvw pb-[200px]">
        <StudioBanner />
        <Inner maxWidth={1200}>
          <StudioProfile />
        </Inner>
        <StudioTab />
      </main>
    </HydrationBoundary>
  );
}
