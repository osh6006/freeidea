import { ToastAction } from '@/components/ui/toast';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import { FeedWriteSchemaType, IFeedBasicParameter } from '@/types/feed';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  feedCommentOption,
  feedDetailOption,
  feedListOption,
  feedModifyOption,
  feedQueryKey,
} from './query-option';
import {
  createFeed,
  createFeedComment,
  deleteFeed,
  deleteFeedComment,
  togglefeedLike,
  togglefeedPangLike,
  togglefeedScrap,
  updateFeed,
} from './service';

// Query
export const useFeedDetailQuery = (feedId: string) => {
  return useQuery(feedDetailOption(feedId));
};

export const useFeedModifyQuery = (feedId: string) => {
  return useQuery(feedModifyOption(feedId));
};

// Infinite Query
export const useFeedListQuery = (
  studioId: string,
  params: IFeedBasicParameter
) => {
  return useInfiniteQuery(feedListOption(studioId, params));
};

export const useFeedCommentListQuery = (
  feedId: string,
  params: IFeedBasicParameter
) => {
  return useInfiniteQuery(feedCommentOption(feedId, params));
};

// Mutation
export const useCreateFeedMutation = () => {
  return useMutation({
    mutationFn: (body: FeedWriteSchemaType) => createFeed(body),
    onError: () => {},
  });
};

export const useUpdateFeedMutation = (feedId: string) => {
  return useMutation({
    mutationFn: (body: FeedWriteSchemaType) => updateFeed(feedId, body),
    onError: () => {},
  });
};

export const useDeleteFeedMutation = (feedId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteFeed(feedId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedQueryKey.lists(),
      });
    },
  });
};

export const useCreateFeedCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedId, comment }: { feedId: string; comment: string }) =>
      createFeedComment(feedId, comment),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: feedQueryKey.commentList(data, {}),
      });
      queryClient.invalidateQueries({
        queryKey: feedQueryKey.details(),
      });
    },
  });
};

export const useDeleteFeedCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedCommentId }: { feedCommentId: string }) =>
      deleteFeedComment(feedCommentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedQueryKey.commentLists(),
      });
      queryClient.invalidateQueries({
        queryKey: feedQueryKey.details(),
      });
    },
  });
};

export const useToggleFeedPangLikeMutation = () => {
  return useMutation({
    mutationFn: ({
      feedId,
      isPangLike,
    }: {
      feedId: string;
      isPangLike: boolean;
    }) => togglefeedPangLike(feedId, isPangLike),
  });
};

export const useToggleFeedLikeMutation = () => {
  return useMutation({
    mutationFn: ({ feedId, isLike }: { feedId: string; isLike: boolean }) =>
      togglefeedLike(feedId, isLike),
  });
};

export const useToggleFeedScrapMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ feedId, isScrap }: { feedId: string; isScrap: boolean }) =>
      togglefeedScrap(feedId, isScrap),

    onSuccess: (_, { isScrap }) => {
      const toastOption = isScrap
        ? {
            description: '스크랩했습니다.',
            action: (
              <ToastAction
                link={`${PATH.myScrap}?tab=FEED`}
                altText="스크랩북 보기"
              >
                스크랩 보기
              </ToastAction>
            ),
          }
        : {
            description: '스크랩을 취소했습니다.',
          };

      toast(toastOption);
    },
  });
};
