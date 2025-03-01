import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { PATH } from '@/constants/path';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { myInfoQueryKey } from '../auth/query-option';
import { mypageQueryKey } from '../mypage/query-option';
import { storeMutationKey } from './mutation-option';
import {
  storeDetailOption,
  storeListOption,
  storeQueryKey,
  storeReviewListOption,
  storeReviewQueryKey,
} from './query-option';
import {
  completePayment,
  createStoreReview,
  deleteStore,
  deleteStoreReview,
} from './service';

export function useStoreDetailQuery(id: string) {
  return useQuery(storeDetailOption(id));
}

export function useStoreListquery() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;
  const useRange = searchParams.get('useRange') ?? undefined;

  return useInfiniteQuery(storeListOption({ category, sort, useRange }));
}

export function useCreateStoreReviewMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string) => createStoreReview(id, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeReviewQueryKey.list(id),
      });
    },
  });
}

export function useStoreReviewListQuery(
  params: Parameters<typeof storeReviewListOption>[0]
) {
  return useQuery(storeReviewListOption(params));
}

export function useCompletePaymentMutation(id: string) {
  const { push } = useRouter();

  return useMutation({
    mutationKey: storeMutationKey.payment(id),
    mutationFn: completePayment,
    onSettled: () => {
      push(PATH.workOrderComplete(id));
    },
  });
}

export function useDeleteStoreMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStore,
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: mypageQueryKey.products(),
      });
      queryClient.removeQueries({
        queryKey: storeQueryKey.detail(id),
      });
      queryClient.refetchQueries({
        queryKey: myInfoQueryKey,
      });
    },
  });
}

export function useDeleteStoreReviewMutation() {
  const { id: productId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStoreReview,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: storeReviewQueryKey.list(productId),
      });
    },
  });
}
