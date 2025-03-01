import React from 'react';

import ProductChatDialog from '@/components/store/store-detail/product-chat';
import ProductDetailDesc from '@/components/store/store-detail/product-detail-desc';
import ProductDetailSidebar from '@/components/store/store-detail/product-detail-sidebar';
import ProductDetailTabs from '@/components/store/store-detail/product-detail-tabs';
import ProductInfo from '@/components/store/store-detail/product-info';
import ProductPreview from '@/components/store/store-detail/product-preview';
import ReviewSection from '@/components/store/store-detail/product-review';
import ProductSuggestList from '@/components/store/store-detail/product-suggest-list';
import WorkOrderFormProvider from '@/components/store/work-order/work-order-form-provider';
import { metadataMap } from '@/lib/metadata';
import { storeReviewListOption } from '@/service/store/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const generateMetadata = metadataMap.storeDetail;

export default async function StoreDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    'review-page'?: string;
  };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    storeReviewListOption({
      productId: params.id,
      page: searchParams['review-page']
        ? Number(searchParams['review-page'])
        : undefined,
    })
  );

  return (
    <>
      <main className="w-full pt-[50px] pb-[200px] max-w-[1200px] mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <section className="w-full flex gap-x-[60px]">
            <ProductPreview />
            <ProductInfo />
          </section>

          <ProductDetailTabs />

          <section className="flex w-full justify-between gap-[30px]">
            <div className="flex flex-col flex-1">
              <ProductDetailDesc />
              <ReviewSection />
            </div>

            <WorkOrderFormProvider>
              <ProductDetailSidebar />
            </WorkOrderFormProvider>
          </section>
        </HydrationBoundary>

        <section className="mt-[50px]">
          <ProductSuggestList />
        </section>
      </main>
      <ProductChatDialog />
    </>
  );
}
