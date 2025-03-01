import Inner from '@/components/common/inner';
import ContentSection from '@/components/portfolio/new/content-section';
import PortfolioEditorProvider from '@/components/portfolio/new/editor-provider';
import ImageUploadSection from '@/components/portfolio/new/image-upload-section';
import PortfolioWriteNavbar from '@/components/portfolio/new/navbar';
import { PortfolioWriteForm } from '@/components/portfolio/new/portfolio-form';
import PortfolioFormProvider from '@/components/portfolio/new/portfolio-form-provider';
import RequiredInfoAccordian from '@/components/portfolio/new/required-info-accordian';
import { challengeListQueryOption } from '@/service/portfolio/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

async function PortfolioPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(challengeListQueryOption());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioFormProvider>
        <PortfolioEditorProvider>
          <PortfolioWriteNavbar mode="write" />

          <PortfolioWriteForm>
            <Inner
              maxWidth={720}
              className="flex flex-col gap-[30px] mt-[50px] mb-[200px]"
            >
              <RequiredInfoAccordian />
              <ImageUploadSection />
              <ContentSection />
            </Inner>
          </PortfolioWriteForm>
        </PortfolioEditorProvider>
      </PortfolioFormProvider>
    </HydrationBoundary>
  );
}

export default PortfolioPage;
