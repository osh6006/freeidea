import { useRouter, useSearchParams } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useToast } from '@/hooks/use-toast';
import { deleteCookie } from '@/lib/cookie';
import {
  IMyPageRequestListParams,
  IMyPageRequesterListParams,
  MyPageAuthorApplyType,
  MyProduct,
} from '@/types/mypage';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { myInfoQueryKey } from '../auth/query-option';
import {
  myFollowerListOption,
  myFollowingListOption,
  myMembershipPaymentQueryOption,
  myMembershipQueryOption,
  myPageProfileQueryOption,
  myProductsQueryOption,
  myQuestionQueryOption,
  myRequestListQueryOption,
  myRequestStateListQueryOption,
  myRequesterListQueryOption,
  myScrapFeedListOption,
  myScrapPortfolioListOption,
  myScrapProductListOption,
  mypageQueryKey,
  useMyPageRequesterDetailOption,
} from './query-option';
import {
  authorApply,
  checkEmailDuplication,
  leaveAccount,
  republishProduct,
  sendCode,
  toggleProductStatus,
  toggleRequstFinish,
  updatePassword,
  updateProfile,
  verifyCode,
} from './service';

export function useMyMembership() {
  return useQuery(myMembershipQueryOption);
}

export function useMyMembershipPayment() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : undefined;

  const startDate = searchParams.get('startDate') ?? undefined;
  const endDate = searchParams.get('endDate') ?? undefined;

  return useQuery(myMembershipPaymentQueryOption({ page, startDate, endDate }));
}

export function useMyProducts() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : undefined;
  const isPending = searchParams.get('isPending') === 'true';

  return useQuery(myProductsQueryOption({ page, isPending }));
}

export function useToggleProductStatus() {
  const { setPageQueriesData } = useOptimisticUpdate();

  return useMutation({
    onMutate: ({ id, isClosed }) => {
      setPageQueriesData<MyProduct>(
        {
          queryKey: mypageQueryKey.products(),
        },
        {
          target: (item) => item.productId === id,
          updater: (item) => ({
            ...item,
            registerStatus: isClosed ? 'CLOSED' : 'CREATED',
          }),
        }
      );
    },

    mutationFn: ({ id, isClosed }: { id: string; isClosed: boolean }) =>
      toggleProductStatus(id, { isClosed }),
  });
}

export function useRepublishProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: republishProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: mypageQueryKey.products() });
      queryClient.refetchQueries({ queryKey: myInfoQueryKey });
    },
  });
}

export function useCheckEmailDuplicationMutation() {
  return useMutation({
    mutationFn: checkEmailDuplication,
  });
}

export function useSendCodeMutation() {
  return useMutation({
    mutationFn: sendCode,
  });
}

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: verifyCode,
    onError: () => {},
  });
}

export function useMyPageProfileQuery() {
  return useQuery(myPageProfileQueryOption);
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast({
        description: '프로필 수정 완료',
      });
      queryClient.refetchQueries({ queryKey: mypageQueryKey.profile() });
      queryClient.refetchQueries({ queryKey: myInfoQueryKey });
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updatePassword,
  });
}

export const useAuthorApplyMutation = () => {
  return useMutation({
    mutationFn: (body: MyPageAuthorApplyType) => authorApply(body),
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useMyQuestionQuery = (params: { limit?: number }) => {
  return useInfiniteQuery(myQuestionQueryOption(params));
};

export const useMyRequestListQuery = (
  params: Omit<IMyPageRequestListParams, 'page'>
) => {
  return useInfiniteQuery(myRequestListQueryOption(params));
};

export const useToggleRequestFinishMutation = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      isFinished,
    }: {
      requestId: string;
      isFinished: boolean;
    }) =>
      toggleRequstFinish(requestId, {
        isFinished,
      }),
  });
};

export const useMyRequesterListQuery = (
  params: Omit<IMyPageRequesterListParams, 'page'>
) => {
  return useInfiniteQuery(myRequesterListQueryOption(params));
};

export const useMyPageRequesterDetailQuery = (id: string) => {
  return useQuery(useMyPageRequesterDetailOption(id));
};

export const useMyRequestStateListQuery = (
  params: Omit<IMyPageRequestListParams, 'page'>
) => {
  return useInfiniteQuery(myRequestStateListQueryOption(params));
};

export function useMyScrapProductListQuery() {
  return useInfiniteQuery(myScrapProductListOption({ limit: 9 }));
}

export function useMyScrapPortfolioListQuery() {
  return useInfiniteQuery(myScrapPortfolioListOption({ limit: 9 }));
}

export function useMyScrapFeedListQuery() {
  return useInfiniteQuery(myScrapFeedListOption({ limit: 9 }));
}

export function useFollowerListQuery() {
  return useInfiniteQuery(myFollowerListOption({ limit: 9 }));
}

export function useFollowingListQuery() {
  return useInfiniteQuery(myFollowingListOption({ limit: 9 }));
}

export function useLeaveAccountMutation() {
  const queryClient = useQueryClient();
  const { push, refresh } = useRouter();

  return useMutation({
    mutationFn: (leaveReason: string) => leaveAccount(leaveReason),
    onSuccess: async () => {
      await Promise.all([
        deleteCookie('accessToken'),
        deleteCookie('refreshToken'),
      ]);
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: myInfoQueryKey });
      push(PATH.home);
      refresh();
    },
  });
}
