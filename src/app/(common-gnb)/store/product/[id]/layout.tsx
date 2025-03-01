import { notFound } from 'next/navigation';

import ERROR_CODE from '@/constants/error-code';
import APIError from '@/lib/api-error';
import { storeDetailOption } from '@/service/store/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function ProductLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const queryClient = new QueryClient();
  const option = storeDetailOption(params.id);

  try {
    await queryClient.fetchQuery(option);
  } catch (error) {
    if (!(error instanceof APIError)) throw error;
    if (error.code === ERROR_CODE.storeDetail.notFound) {
      notFound();
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
