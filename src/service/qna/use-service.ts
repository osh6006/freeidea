import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path';
import { IQnaBasicParams, QnaWriteSchemaType } from '@/types/qna';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { myInfoQueryKey, myInfoQueryOption } from '../auth/query-option';
import {
  qnaAnswerCommentListQueryOption,
  qnaAuthorListByCategoryQueryOption,
  qnaDetailAnswerListQueryOption,
  qnaDetailModifyQueryOption,
  qnaDetailQueryOption,
  qnaListQueryOption,
  qnaQueryKey,
  qnaRecentActiveAuthorQueryOption,
  qnaRecentlyListOption,
} from './query-option';
import {
  createQna,
  createQnaAnswer,
  createQnaAnswerComment,
  deleteQna,
  deleteQnaAnswer,
  deleteQnaAnswerComment,
  toggleQnaAnswerLike,
  toggleQnaAnswerMembershipLike,
  toggleQnaAnswerShown,
  updateQna,
  updateQnaAnswer,
} from './service';

// Query

export const useQnaDetailQuery = (qnaId: string) => {
  return useQuery(qnaDetailQueryOption(qnaId));
};

export const useQnaModifyQuery = (qnaId: string) => {
  return useQuery(qnaDetailModifyQueryOption(qnaId));
};

export const useQnaRecentActiveAuthorsQuery = () => {
  return useQuery(qnaRecentActiveAuthorQueryOption());
};

export const useQnaRectnlyListQuery = () => {
  return useQuery(qnaRecentlyListOption());
};

export const useQnaAuthorListByCategoryQuery = () => {
  return useQuery(qnaAuthorListByCategoryQueryOption());
};

// Infinite Query

export const useQnaListQuery = (params: IQnaBasicParams) => {
  return useInfiniteQuery(qnaListQueryOption(params));
};

export const useQnaAnswerList = (
  qnaId: string,
  params: Omit<IQnaBasicParams, 'page'>
) => {
  return useInfiniteQuery(qnaDetailAnswerListQueryOption(qnaId, params));
};

export const useQnaAnswerCommentList = (qnaId: string) => {
  return useInfiniteQuery(qnaAnswerCommentListQueryOption(qnaId, {}));
};

// Mutation
export const useCreateQnaMutation = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: QnaWriteSchemaType) => createQna(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...qnaQueryKey.all],
      });
      replace(PATH.loungeQna);
      queryClient.invalidateQueries({
        queryKey: myInfoQueryOption.queryKey,
      });
    },
  });
};

export const useUpdateQnaMutation = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      qnaId,
      body,
    }: {
      qnaId: string;
      body: QnaWriteSchemaType;
    }) => updateQna(qnaId, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.detail(data),
      });

      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.list({}),
      });
      replace(PATH.loungeQnaDetail(data));
    },
  });
};

export const useDeleteQnaMutation = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qnaId: string) => deleteQna(qnaId),
    onSuccess: () => {
      replace(PATH.loungeQna);
      queryClient.invalidateQueries({
        queryKey: myInfoQueryOption.queryKey,
      });
    },
  });
};

export const useCreateQnaAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      qnaId,
      body,
    }: {
      qnaId: string;
      body: {
        contents: string;
      };
    }) => createQnaAnswer(qnaId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.lists(),
      });
    },
  });
};

export const useUpdateQnaAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      qnaAnswerId,
      body,
    }: {
      qnaAnswerId: string;
      body: {
        contents: string;
      };
    }) => updateQnaAnswer(qnaAnswerId, body),
    onSuccess: ({ qnaAnswerId }) => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.detail(qnaAnswerId),
      });
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.lists(),
      });
    },
  });
};

export const useDeleteQnaAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qnaAnswerId: string) => deleteQnaAnswer(qnaAnswerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.lists(),
      });
    },
  });
};

export const useToggleQnaAnswerShown = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      qnaAnswerId,
      body,
    }: {
      qnaAnswerId: string;
      body: { isShown: boolean };
    }) => toggleQnaAnswerShown(qnaAnswerId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.lists(),
      });
    },
  });
};

export const useQnaAnswerPangLikeMutation = () => {
  return useMutation({
    mutationFn: ({
      qnaAnswerId,
      isMembershipLiked,
    }: {
      qnaAnswerId: string;
      isMembershipLiked: boolean;
    }) =>
      toggleQnaAnswerMembershipLike(qnaAnswerId, {
        isMembershipLiked,
      }),
  });
};

export const useQnaAnswerLikeMutation = () => {
  return useMutation({
    mutationFn: ({
      qnaAnswerId,
      isLiked,
    }: {
      qnaAnswerId: string;
      isLiked: boolean;
    }) =>
      toggleQnaAnswerLike(qnaAnswerId, {
        isLiked,
      }),
  });
};

export const useCreateQnaAnswerComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      qnaAnswerId,
      comment,
    }: {
      qnaAnswerId: string;
      comment: string;
    }) =>
      createQnaAnswerComment(qnaAnswerId, {
        comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.lists(),
      });
    },
  });
};
export const useDeleteQnaAnswerComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qnaAnswerCommentId: string) =>
      deleteQnaAnswerComment(qnaAnswerCommentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qnaQueryKey.lists(),
      });
    },
  });
};
