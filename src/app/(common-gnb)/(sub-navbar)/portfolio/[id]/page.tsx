import AuthorSection from '@/components/portfolio/detail/author-section';
import CommentFormProvider from '@/components/portfolio/detail/comment-form-provider';
import CommentSection from '@/components/portfolio/detail/comment-section';
import ContentSection from '@/components/portfolio/detail/content-section';
import EngagementBar from '@/components/portfolio/detail/engagement-bar';
import ImageSection from '@/components/portfolio/detail/image-section';
import MeatballButton from '@/components/portfolio/detail/meatball-button';
import { Separator } from '@/components/ui/separator';
import { metadataMap } from '@/lib/metadata';
import { portfolioDetailQueryOption } from '@/service/portfolio/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const generateMetadata = metadataMap.portfolio;

async function PortfolioPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(portfolioDetailQueryOption(params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommentFormProvider>
        <div className="relative flex justify-center  mt-[50px] mb-[200px] h-fit">
          <div className="relative flex flex-col gap-[50px] w-[720px]">
            <MeatballButton />
            <div className="flex flex-col gap-[30px]">
              <ImageSection />
              <ContentSection />
            </div>
            <Separator />
            <AuthorSection />
            <CommentSection />
          </div>
          <EngagementBar />
        </div>
      </CommentFormProvider>
    </HydrationBoundary>
  );
}

export default PortfolioPage;
