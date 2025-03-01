import { useParams, useRouter } from 'next/navigation';

import { useGlobalDialogStore } from '@/components/provider/global-dialog/store';
import { ToastAction } from '@/components/ui/toast';
import API_CODE from '@/constants/error-code';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import APIError from '@/lib/api-error';
import {
  PortfolioCommentRequestParams,
  PortfolioWriteRequestType,
} from '@/types/portfolio';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  challengeListQueryOption,
  portfolioCommentListQueryOption,
  portfolioDetailQueryOption,
  portfolioEditDataQueryOption,
  portfolioQueryKey,
} from './query-option';
import {
  createComment,
  createPortfolio,
  deleteComment,
  deletePortfolio,
  likePortfolio,
  pangPortfolio,
  scrapPortfolio,
  updatePortfolio,
} from './service';

export function useCreatePortfolio() {
  const router = useRouter();
  return useMutation({
    mutationFn: createPortfolio,
    onSuccess: ({ portfolioId }) => {
      router.push(PATH.portfolioDetail(portfolioId));
    },
  });
}

export function useUpdatePortfolio(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PortfolioWriteRequestType) => updatePortfolio(id, body),

    onSuccess: () => {
      router.push(PATH.portfolioDetail(id));
      queryClient.invalidateQueries({
        queryKey: portfolioQueryKey.detail(id),
      });
    },
  });
}

export function usePortfolioEditData(id: string) {
  return useQuery(portfolioEditDataQueryOption(id));
}

export function useDeletePortfolio(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePortfolio(id),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: portfolioQueryKey.detail(id),
        exact: true,
      });
    },
  });
}

export function useGetChallengeList({
  enabled = false,
}: {
  enabled?: boolean;
}) {
  return useQuery(challengeListQueryOption(enabled));
}

export function usePortfolioDetail(id: string) {
  return useQuery(portfolioDetailQueryOption(id));
}

export function usePortfolioCommentList(params: PortfolioCommentRequestParams) {
  return useInfiniteQuery(portfolioCommentListQueryOption(params));
}

export function useCreateComment(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { comment: string }) => createComment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioQueryKey.comment(id),
      });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: portfolioCommentListQueryOption({ id }).queryKey,
      });
    },
  });
}

export function useLikePortfolio() {
  return useMutation({
    mutationFn: ({ id, isLiked }: { isLiked: boolean; id: string }) =>
      likePortfolio(id, { isLiked }),
  });
}

export function useScrapPortfolio() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      portfolioId,
      isScrapping,
    }: {
      portfolioId: string;
      isScrapping: boolean;
    }) => scrapPortfolio(portfolioId, { isScrapping }),

    onSuccess: ({ isScrapping }) => {
      const toastOption = isScrapping
        ? {
            description: '스크랩했습니다.',
            action: (
              <ToastAction
                link={`${PATH.myScrap}?tab=PORTFOLIO`}
                altText="스크랩 보기"
              >
                스크랩 보기
              </ToastAction>
            ),
          }
        : {
            description: '스크랩을 취소했습니다.',
            className: 'justify-center',
          };

      toast(toastOption);
    },
  });
}

export function usePangPortfolio() {
  const { setIsUseMembershipDialogOpen, setIsNeedLoginDialogOpen } =
    useGlobalDialogStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      portfolioId,
      isMembershipLiked,
    }: {
      portfolioId: string;
      isMembershipLiked: boolean;
    }) => pangPortfolio(portfolioId, { isMembershipLiked }),

    onError: (error) => {
      const isAPIError = error instanceof APIError;

      if (isAPIError && error.code === API_CODE.ACCESS_TOKEN_FAILURE) {
        setIsNeedLoginDialogOpen(true);
        return;
      }

      if (isAPIError && error.code === 'PERMISSION_DENIED') {
        setIsUseMembershipDialogOpen(true);
        return;
      }

      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });
}
