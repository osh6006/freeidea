import { IQnaBasicParams, IRecentlyQna } from '@/types/qna';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import {
  getQnaAnswerCommentList,
  getQnaAnswerList,
  getQnaAuthorListByCategory,
  getQnaDetail,
  getQnaList,
  getRecentActiveAuthorList,
  getRecentQnaList,
} from './service';

export const qnaQueryKey = {
  all: 'qna',

  lists: () => [...qnaQueryKey.all, 'list'],
  list: (params: object) =>
    [...qnaQueryKey.lists(), params].filter((v) => v !== undefined),

  answerList: (id: string, params: object) =>
    [...qnaQueryKey.lists(), 'answer', params, id].filter(
      (v) => v !== undefined
    ),
  commentList: (id: string, params: object) =>
    [...qnaQueryKey.lists(), 'answer', 'comment', params, id].filter(
      (v) => v !== undefined
    ),

  recentActiveAuthor: () => [...qnaQueryKey.lists(), 'recentActiveAuthor'],
  recentQna: () => [...qnaQueryKey.lists(), 'recentQna'],
  categoryAuthors: () => [...qnaQueryKey.lists(), 'categoryAuthors'],

  details: () => [...qnaQueryKey.all, 'detail'],
  detail: (id: string) => [...qnaQueryKey.details(), id],
  detailModify: (id: string) => [...qnaQueryKey.details(), 'modify', id],
};

// Qna 메인 페이지

export const qnaListQueryOption = ({
  limit,
}: Omit<IQnaBasicParams, 'page'>) => {
  return infiniteQueryOptions({
    queryKey: qnaQueryKey.list({ limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getQnaList({ page: pageParam, limit }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};

export const qnaRecentActiveAuthorQueryOption = () => {
  return queryOptions({
    queryKey: qnaQueryKey.recentActiveAuthor(),
    queryFn: () => getRecentActiveAuthorList(),
  });
};

// Qna 상세 페이지

export const qnaDetailQueryOption = (qnaId: string) => {
  return queryOptions({
    queryKey: qnaQueryKey.detail(qnaId),
    queryFn: () => getQnaDetail(qnaId),
    enabled: !!qnaId,
  });
};

export const qnaDetailModifyQueryOption = (qnaId: string) => {
  return queryOptions({
    queryKey: qnaQueryKey.detailModify(qnaId),
    queryFn: () => getQnaDetail(qnaId),
    enabled: !!qnaId,
  });
};

export const qnaRecentlyListOption = () => {
  return queryOptions({
    queryKey: qnaQueryKey.recentQna(),
    queryFn: () => getRecentQnaList(),
    select(data) {
      if (data.length <= 0) return [];

      const groupedData: { id: string; data: IRecentlyQna[] }[] = [];
      for (let i = 0; i < data.length; i += 4) {
        groupedData.push({
          id: `group-${Math.floor(i / 4) + 1}`,
          data: data.slice(i, i + 4),
        });
      }

      return groupedData;
    },
  });
};

export const qnaAuthorListByCategoryQueryOption = () => {
  return queryOptions({
    queryKey: qnaQueryKey.categoryAuthors(),
    queryFn: () => getQnaAuthorListByCategory(),
  });
};

export const qnaDetailAnswerListQueryOption = (
  qnaId: string,
  params: Omit<IQnaBasicParams, 'page'>
) => {
  return infiniteQueryOptions({
    queryKey: qnaQueryKey.answerList(qnaId, params),
    initialPageParam: 1,
    enabled: !!qnaId,
    queryFn: ({ pageParam }) =>
      getQnaAnswerList(qnaId, { page: pageParam, limit: params.limit }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
        count: data.pages[0].count,
        isAnswered: data.pages[0].isAnswered,
      };
    },
  });
};

export const qnaAnswerCommentListQueryOption = (
  qnaAnswerId: string,
  params: Omit<IQnaBasicParams, 'page'>
) => {
  return infiniteQueryOptions({
    queryKey: qnaQueryKey.commentList(qnaAnswerId, params),
    initialPageParam: 1,
    enabled: !!qnaAnswerId,
    queryFn: ({ pageParam }) =>
      getQnaAnswerCommentList(qnaAnswerId, {
        page: pageParam,
        limit: params.limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};
