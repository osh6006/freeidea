import API_CODE from '@/constants/error-code';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useToast } from '@/hooks/use-toast';
import APIError from '@/lib/api-error';
import {
  GuestBookSchemaType,
  IGuestBook,
  IStudioBasicParameter,
  IStudioFollowInfoListParameter,
  IStudioNotice,
  IStudioWorkListParameter,
  NotiSchemaType,
} from '@/types/studio';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getStudioQnaListQueryOption,
  studioAuthorBoardOption,
  studioFollowInfoListOption,
  studioGuestBookListOption,
  studioHomePortfolioListOption,
  studioHomeStoreOption,
  studioNoticeListOption,
  studioNoticeOption,
  studioPortfolioListOption,
  studioProfileDetailOption,
  studioProfilePopupOption,
  studioQueryKey,
  studioStoreListOption,
} from './query-option';
import {
  clearStudioBanner,
  createStudioGuestBook,
  createStudioNoti,
  deleteStudioGuestBook,
  deleteStudioNoti,
  followAuthor,
  toggleStudioNotiFix,
  updateStudioBanner,
  updateStudioGuestBook,
  updateStudioNoti,
} from './service';

// === Query === //
export function useStudioProfileQuery(studioId: string) {
  return useQuery(studioProfileDetailOption(studioId));
}
export function useStudioProfilePopupQuery(studioId: string) {
  return useQuery(studioProfilePopupOption(studioId));
}
export function useStudioNoticeQuery(studioId: string) {
  return useQuery(studioNoticeOption(studioId));
}

export function useStudioHomePortfolioListQuery(studioId: string) {
  return useQuery(studioHomePortfolioListOption(studioId));
}

export function useStudioHomeStoreListQuery(
  studioId: string,
  params: IStudioWorkListParameter
) {
  return useQuery(studioHomeStoreOption(studioId, params));
}

export function useStudioAuthorBoardSlotQuery(studioId: string) {
  return useQuery(studioAuthorBoardOption(studioId));
}

// === Infinite Query === //
export function useStudioFollowInfoListQuery(
  params: IStudioFollowInfoListParameter
) {
  return useInfiniteQuery(studioFollowInfoListOption(params));
}

export function useStudioStoreListQuery(
  studioId: string,
  params: IStudioWorkListParameter
) {
  return useInfiniteQuery(studioStoreListOption(studioId, params));
}

export function usePortfolioListQuery(
  studioId: string,
  params: IStudioBasicParameter
) {
  return useInfiniteQuery(studioPortfolioListOption(studioId, params));
}

export function useStudioNoticeListQuery(
  studioId: string,
  params: IStudioBasicParameter
) {
  return useInfiniteQuery(studioNoticeListOption(studioId, params));
}

export function useStudioGuestBookListQuery(
  studioId: string,
  params: IStudioBasicParameter
) {
  return useInfiniteQuery(studioGuestBookListOption(studioId, params));
}

export function useStudioQnaListQuery(
  studioId: string,
  params: Omit<IStudioBasicParameter, 'page'>
) {
  return useInfiniteQuery(getStudioQnaListQueryOption(studioId, params));
}

// === Mutation === //
export function useFollowAuthorMutation() {
  return useMutation({
    mutationFn: ({
      studioId,
      isFollowing,
    }: {
      studioId: string;
      isFollowing: boolean;
    }) => followAuthor(studioId, { isFollowing }),
  });
}

export function useBannerClearMutation(studioId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearStudioBanner(studioId),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.profileDetail(studioId),
      });
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.profilePopup(studioId),
      });
    },
  });
}

export function useBannerUpdateMutation(studioId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (titleImageId: string) =>
      updateStudioBanner(studioId, titleImageId),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.profileDetail(studioId),
      });
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.profilePopup(studioId),
      });
    },
  });
}

export function useStudioCreateNoticeMutation(studioId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contents, isFixed }: NotiSchemaType) =>
      createStudioNoti(studioId, {
        contents,
        isFixed,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.noticeFixed(studioId),
      });

      queryClient.invalidateQueries({
        queryKey: studioQueryKey.notice(),
      });
    },
  });
}

export function useStudioUpdateNoticeMutation(noticeId: string) {
  const { setInfinitePageQueriesData } = useOptimisticUpdate();

  return useMutation({
    mutationFn: ({ contents, isFixed }: {} & NotiSchemaType) =>
      updateStudioNoti(noticeId, {
        contents,
        isFixed,
      }),
    onMutate: ({ contents }) => {
      const prevDataList = [
        setInfinitePageQueriesData<IStudioNotice>(
          {
            queryKey: studioQueryKey.notice(),
          },
          {
            target: (item) => item.studioNoticeId === noticeId,
            updater: (item) => ({ ...item, contents: contents }),
          }
        ),
      ];

      return { prevDataList };
    },
  });
}

export function useStudioNoticeDeleteMustaion(
  studioId: string,
  noticeId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteStudioNoti(noticeId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.noticeFixed(studioId),
      });

      queryClient.invalidateQueries({
        queryKey: studioQueryKey.notice(),
      });
    },
  });
}

export function useStudioNoticeFixMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noticeId,
      isFixed,
    }: {
      noticeId: string;
      isFixed: boolean;
    }) => toggleStudioNotiFix(noticeId, isFixed),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.notice(),
      });
    },
  });
}

export function useCreateGuestBookMustation(studioId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contents }: NotiSchemaType) =>
      createStudioGuestBook(studioId, {
        contents,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.guestBook(),
      });
    },
  });
}

export function useUpdateGuestBookMutation(guestBookId: string) {
  const { setInfinitePageQueriesData } = useOptimisticUpdate();

  return useMutation({
    mutationFn: ({ contents }: GuestBookSchemaType) =>
      updateStudioGuestBook(guestBookId, {
        contents,
      }),

    onMutate: ({ contents }) => {
      const prevDataList = [
        setInfinitePageQueriesData<IGuestBook>(
          {
            queryKey: studioQueryKey.guestBook(),
          },
          {
            target: (item) => item.studioVisitorId === guestBookId,
            updater: (item) => ({ ...item, contents: contents }),
          }
        ),
      ];

      return { prevDataList };
    },
  });
}

export function useDeleteGuestBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guestBookId }: { guestBookId: string }) =>
      deleteStudioGuestBook(guestBookId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: studioQueryKey.guestBook(),
      });
    },
  });
}
