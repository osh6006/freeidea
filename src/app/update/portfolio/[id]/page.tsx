import Inner from '@/components/common/inner';
import ContentSection from '@/components/portfolio/new/content-section';
import PortfolioEditorProvider from '@/components/portfolio/new/editor-provider';
import ImageUploadSection from '@/components/portfolio/new/image-upload-section';
import PortfolioWriteNavbar from '@/components/portfolio/new/navbar';
import { PortfolioUpdateForm } from '@/components/portfolio/new/portfolio-form';
import { PortfolioUpdateFormProvider } from '@/components/portfolio/new/portfolio-form-provider';
import RequiredInfoAccordian from '@/components/portfolio/new/required-info-accordian';
import { portfolioEditDataQueryOption } from '@/service/portfolio/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

async function PortfolioUpdatePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(portfolioEditDataQueryOption(id));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioUpdateFormProvider>
        <PortfolioEditorProvider>
          <PortfolioWriteNavbar mode="update" />

          <PortfolioUpdateForm id={id}>
            <Inner
              maxWidth={720}
              className="flex flex-col gap-[30px] mt-[50px] mb-[200px]"
            >
              <RequiredInfoAccordian />
              <ImageUploadSection />
              <ContentSection />
            </Inner>
          </PortfolioUpdateForm>
        </PortfolioEditorProvider>
      </PortfolioUpdateFormProvider>
    </HydrationBoundary>
  );
}

export default PortfolioUpdatePage;
