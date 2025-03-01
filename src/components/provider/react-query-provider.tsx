'use client';

import API_CODE from '@/constants/error-code';
import { useToast } from '@/hooks/use-toast';
import APIError from '@/lib/api-error';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useGlobalDialogStore } from './global-dialog/store';

let browserQueryClient: QueryClient | undefined;

function useGetCustomQueryClient() {
  const { toast } = useToast();
  const { setIsNeedLoginDialogOpen } = useGlobalDialogStore();

  async function onError(error: Error) {
    const isApiError = error instanceof APIError;

    if (isApiError && error.code === API_CODE.ACCESS_TOKEN_FAILURE) {
      setIsNeedLoginDialogOpen(true);
      return;
    }

    if (isApiError && error.code === API_CODE.TOO_MANY_REQUESTS) {
      toast({
        variant: 'destructive',
        description: '잠시 후 다시 시도해주세요.',
      });
      return;
    }

    toast({
      variant: 'destructive',
      description: isApiError
        ? error.message
        : '알 수 없는 오류가 발생했습니다.',
    });
  }

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
      mutations: {
        onError,
      },
    },
  });
}

function useCustomQueryClient() {
  const queryClient = useGetCustomQueryClient();
  if (typeof window === 'undefined') {
    return queryClient;
  }
  if (!browserQueryClient) browserQueryClient = queryClient;
  return browserQueryClient;
}

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useCustomQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools
        initialIsOpen={false}
        position="top"
      /> */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
