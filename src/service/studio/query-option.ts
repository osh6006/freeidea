import {
  IStudioFollowInfoListParameter,
  IStudioWorkListParameter,
} from '@/types/studio';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import { getPortfolioList } from '../portfolio/service';
import { IStudioBasicParameter } from './../../types/studio';
import {
  getStudioAuthorBoard,
  getStudioFollowInfoList,
  getStudioGuestBookList,
  getStudioNotiList,
  getStudioNotice,
  getStudioProfileInfo,
  getStudioProfilePopup,
  getStudioQnaList,
  getStudioWorkList,
} from './service';

export const studioQueryKey = {
  all: ['studio'],
  profile: () => [...studioQueryKey.all, 'profile'],
  profileDetail: (id: string) => [...studioQueryKey.profile(), 'detail', id],
  profilePopup: (id: string) => [...studioQueryKey.profile(), 'popup', id],
  profileFollowInfoList: (
    type: string,
    params: Omit<IStudioFollowInfoListParameter, 'type'>
  ) => [studioQueryKey.profile, type, params],

  portfolio: () => [...studioQueryKey.all, 'portfolio'],
  portfolioHome: (id: string) => [...studioQueryKey.portfolio(), 'home', id],
  portfolioList: (id: string, params: object) => [
    ...studioQueryKey.portfolio(),
    id,
    params,
  ],

  store: () => [...studioQueryKey.all, 'store'],
  storeHome: (id: string) => [...studioQueryKey.store(), 'home', id],
  storeList: (id: string, params: object) => [
    ...studioQueryKey.store(),
    id,
    params,
  ],

  notice: () => [...studioQueryKey.all, 'notice'],
  noticeFixed: (id: string) => [...studioQueryKey.notice(), id],
  noticeList: (id: string, params: object) => [
    ...studioQueryKey.notice(),
    id,
    params,
  ],

  guestBook: () => [...studioQueryKey.all, 'guestBook'],
  guestBookList: (id: string, params: object) => [
    ...studioQueryKey.guestBook(),
    id,
    params,
  ],

  authorBoard: () => [...studioQueryKey.all, 'authorBoard'],
  authorBoardSlot: (id: string) => [
    ...studioQueryKey.authorBoard(),
    'authorBoard',
    id,
  ],

  qna: () => [...studioQueryKey.all, 'qna'],
  qnaLists: () => [...studioQueryKey.qna(), 'list'],
  qnaList: (id: string, params: object) =>
    [...studioQueryKey.qna(), 'list', id, params].filter(
      (v) => v !== undefined
    ),
};

// Profile

export const studioProfileDetailOption = (studioId: string) => {
  return queryOptions({
    queryKey: studioQueryKey.profileDetail(studioId),
    enabled: !!studioId,
    queryFn: () => getStudioProfileInfo(studioId),
  });
};

export const studioProfilePopupOption = (studioId: string) => {
  return queryOptions({
    queryKey: studioQueryKey.profilePopup(studioId),
    enabled: !!studioId,
    queryFn: () => getStudioProfilePopup(studioId),
  });
};

export const studioFollowInfoListOption = ({
  type,
  studioId,
  page = 1,
  limit = 10,
}: IStudioFollowInfoListParameter) => {
  return infiniteQueryOptions({
    queryKey: studioQueryKey.profileFollowInfoList(type, {
      studioId,
      page,
      limit,
    }),
    initialPageParam: 1,
    enabled: !!studioId && !!type,
    queryFn: ({ pageParam }) =>
      getStudioFollowInfoList(type, studioId, { page: pageParam, limit }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const { count, page } = data.pages[0];
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { list: flattenList, count, page };
    },
  });
};

// Store

export const studioHomeStoreOption = (
  studioId: string,
  params: IStudioWorkListParameter
) => {
  return queryOptions({
    queryKey: studioQueryKey.storeList(studioId, params),
    enabled: !!studioId,
    queryFn: () => getStudioWorkList(studioId, params),
  });
};

export const studioStoreListOption = (
  studioId: string,
  params: IStudioWorkListParameter
) => {
  return infiniteQueryOptions({
    queryKey: studioQueryKey.storeList(studioId, params),
    enabled: !!studioId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getStudioWorkList(studioId, { page: pageParam, ...params }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const { count, page } = data.pages[0];
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { list: flattenList, count, page };
    },
  });
};

// Portfolio

export const studioHomePortfolioListOption = (studioId: string) => {
  return queryOptions({
    queryKey: studioQueryKey.portfolioHome(studioId),
    enabled: !!studioId,
    queryFn: () => getPortfolioList(studioId, { limit: 4, page: 1 }),
  });
};

export const studioPortfolioListOption = (
  studioId: string,
  params: IStudioBasicParameter
) => {
  return infiniteQueryOptions({
    queryKey: studioQueryKey.portfolioList(studioId, params),
    enabled: !!studioId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPortfolioList(studioId, params),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const { count, page } = data.pages[0];
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { list: flattenList, count, page };
    },
  });
};

// Notice
export const studioNoticeOption = (studioId: string) => {
  return queryOptions({
    queryKey: studioQueryKey.noticeFixed(studioId),
    enabled: !!studioId,
    queryFn: () => getStudioNotice(studioId),
  });
};

export const studioNoticeListOption = (
  studioId: string,
  params: IStudioBasicParameter
) => {
  return infiniteQueryOptions({
    queryKey: studioQueryKey.noticeList(studioId, params),
    enabled: !!studioId,
    initialPageParam: 1,
    queryFn: () => getStudioNotiList(studioId, params),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const { count, page } = data.pages[0];
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { list: flattenList, count, page };
    },
  });
};

// Guest Book

export const studioGuestBookListOption = (
  studioId: string,
  params: IStudioBasicParameter
) => {
  return infiniteQueryOptions({
    queryKey: studioQueryKey.guestBookList(studioId, params),
    enabled: !!studioId,
    initialPageParam: 1,
    queryFn: () => getStudioGuestBookList(studioId, params),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const { count, page } = data.pages[0];
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { list: flattenList, count, page };
    },
  });
};

// Author Board
export const studioAuthorBoardOption = (studioId: string) => {
  return queryOptions({
    queryKey: studioQueryKey.authorBoardSlot(studioId),
    enabled: !!studioId,
    queryFn: () => getStudioAuthorBoard(studioId),
  });
};

// Qna
export const getStudioQnaListQueryOption = (
  studioId: string,
  params: Omit<IStudioBasicParameter, 'page'>
) => {
  return infiniteQueryOptions({
    queryKey: studioQueryKey.qnaList(studioId, params),
    initialPageParam: 1,
    enabled: !!studioId,
    queryFn: ({ pageParam }) =>
      getStudioQnaList(studioId, {
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
