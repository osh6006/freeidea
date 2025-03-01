import { getKstNow } from '@/lib/date';
import {
  IMyPageRequestListParams,
  IMyPageRequesterListParams,
  MyMembershipPaymentRequest,
} from '@/types/mypage';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import { add, formatDate } from 'date-fns';

import {
  getMyFollowerList,
  getMyFollowingList,
  getMyMembership,
  getMyMembershipPayment,
  getMyPageProfile,
  getMyPageRequestList,
  getMyPageRequestStateList,
  getMyPageRequesterDetail,
  getMyPageRequesterList,
  getMyProducts,
  getMyQuestions,
  getMyScrapFeedList,
  getMyScrapPortfolioList,
  getMyScrapProductList,
} from './service';

export const mypageQueryKey = {
  mypage: ['mypage'],

  membership: () => [...mypageQueryKey.mypage, 'membership'],
  membershipInfo: () => [...mypageQueryKey.membership(), 'info'],
  membershipPayment: (filter?: object) =>
    [...mypageQueryKey.membership(), 'payment', filter].filter(
      (v) => v !== undefined
    ),

  products: () => [...mypageQueryKey.mypage, 'products'],
  product: ({
    page,
    limit,
    isPending,
  }: {
    page: number;
    limit: number;
    isPending: boolean;
  }) => [...mypageQueryKey.products(), { page, limit, isPending }],

  profile: () => [...mypageQueryKey.mypage, 'profile'],
  question: () => [...mypageQueryKey.mypage, 'question'],
  questions: ({ limit }: { limit: number }) => [
    ...mypageQueryKey.question(),
    { limit },
  ],

  request: () => [...mypageQueryKey.mypage, 'request'],
  requestList: ({ limit, filter }: Omit<IMyPageRequestListParams, 'page'>) => [
    ...mypageQueryKey.request(),
    { limit, filter },
  ],

  requester: () => [...mypageQueryKey.mypage, 'requester'],
  requesterList: ({ limit }: Omit<IMyPageRequesterListParams, 'page'>) => [
    ...mypageQueryKey.question(),
    { limit },
  ],
  requesterDetail: (id: string) => [
    ...mypageQueryKey.requester(),
    'detail',
    id,
  ],

  requestState: () => [...mypageQueryKey.mypage, 'requestState'],
  requestStateList: ({
    limit,
    filter,
  }: Omit<IMyPageRequestListParams, 'page'>) => [
    ...mypageQueryKey.requestState(),
    { limit, filter },
  ],
};

export const myMembershipPaymentQueryOption = ({
  page = 1,
  endDate,
  startDate,
}: MyMembershipPaymentRequest) => {
  const now = formatDate(getKstNow(), 'yyyy-MM-dd');
  const nextMonth = formatDate(add(getKstNow(), { months: 1 }), 'yyyy-MM-dd');

  return queryOptions({
    queryKey: mypageQueryKey.membershipPayment({
      page,
      endDate: endDate || nextMonth,
      startDate: startDate || now,
    }),
    queryFn: () => getMyMembershipPayment({ page, endDate, startDate }),
  });
};

export const myMembershipQueryOption = queryOptions({
  queryKey: mypageQueryKey.membershipInfo(),
  queryFn: getMyMembership,
});

export const myProductsQueryOption = ({
  page = 1,
  limit = 10,
  isPending,
}: {
  page?: number;
  limit?: number;
  isPending: boolean;
}) =>
  queryOptions({
    queryKey: mypageQueryKey.product({ page, limit, isPending }),
    queryFn: () => getMyProducts({ page, limit, isPending }),
  });

export const myPageProfileQueryOption = queryOptions({
  queryKey: mypageQueryKey.profile(),
  queryFn: getMyPageProfile,
});

export const myQuestionQueryOption = ({
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  return infiniteQueryOptions({
    queryKey: mypageQueryKey.questions({ limit }),
    queryFn: ({ pageParam }) => getMyQuestions({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};

export const myRequestListQueryOption = ({
  limit = 10,
  filter,
}: Omit<IMyPageRequestListParams, 'page'>) => {
  return infiniteQueryOptions({
    queryKey: mypageQueryKey.requestList({ limit, filter }),
    queryFn: ({ pageParam }) =>
      getMyPageRequestList({ page: pageParam, limit, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};

export const myRequesterListQueryOption = ({
  limit = 10,
}: Omit<IMyPageRequesterListParams, 'page'>) => {
  return infiniteQueryOptions({
    queryKey: mypageQueryKey.requesterList({ limit }),
    queryFn: ({ pageParam }) =>
      getMyPageRequesterList({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};

export const useMyPageRequesterDetailOption = (id: string) => {
  return queryOptions({
    queryKey: mypageQueryKey.requesterDetail(id),
    queryFn: () => getMyPageRequesterDetail(id),
    enabled: !!id,
  });
};

export const myRequestStateListQueryOption = ({
  limit = 10,
  filter,
}: Omit<IMyPageRequestListParams, 'page'>) => {
  return infiniteQueryOptions({
    queryKey: mypageQueryKey.requestList({ limit, filter }),
    queryFn: ({ pageParam }) =>
      getMyPageRequestStateList({ page: pageParam, limit, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};

export const myScrapProductQueryKey = {
  all: ['myScrapProduct'],
  lists: () => [...myScrapProductQueryKey.all, 'list'],
  list: (filter: { limit: number }) => [
    ...myScrapProductQueryKey.lists(),
    `limit-${filter.limit}`,
  ],
};

export const myScrapPortfolioQueryKey = {
  all: ['myScrapPortfolio'],
  lists: () => [...myScrapPortfolioQueryKey.all, 'list'],
  list: (filter: { limit: number }) => [
    ...myScrapPortfolioQueryKey.lists(),
    `limit-${filter.limit}`,
  ],
};

export const myScrapFeedQueryKey = {
  all: ['myScrapFeed'],
  lists: () => [...myScrapFeedQueryKey.all, 'list'],
  list: (filter: { limit: number }) => [
    ...myScrapFeedQueryKey.lists(),
    `limit-${filter.limit}`,
  ],
};

export const myFollowersQueryKey = {
  all: ['myFollowers'],
  list: (filter: { limit: number }) => [
    `myFollowerList`,
    `limit-${filter.limit}`,
  ],
};

export const myFollowingsQueryKey = {
  all: ['myFollowings'],
  list: (filter: { limit: number }) => [
    `myFollowingList`,
    `limit-${filter.limit}`,
  ],
};

export const myFollowingListOption = ({
  limit = 9,
}: Parameters<typeof getMyFollowingList>[0]) =>
  infiniteQueryOptions({
    queryKey: myFollowingsQueryKey.list({ limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMyFollowingList({
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
      };
    },
  });

export const myFollowerListOption = ({
  limit = 9,
}: Parameters<typeof getMyFollowerList>[0]) =>
  infiniteQueryOptions({
    queryKey: myFollowersQueryKey.list({ limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMyFollowerList({
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
      };
    },
  });

export const myScrapProductListOption = ({
  limit = 9,
}: Parameters<typeof getMyScrapProductList>[0]) =>
  infiniteQueryOptions({
    queryKey: myScrapProductQueryKey.list({ limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMyScrapProductList({
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
      };
    },
  });

export const myScrapPortfolioListOption = ({
  limit = 9,
}: Parameters<typeof getMyScrapPortfolioList>[0]) =>
  infiniteQueryOptions({
    queryKey: myScrapPortfolioQueryKey.list({ limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMyScrapPortfolioList({
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
      };
    },
  });

export const myScrapFeedListOption = ({
  limit = 9,
}: Parameters<typeof getMyScrapFeedList>[0]) =>
  infiniteQueryOptions({
    queryKey: myScrapFeedQueryKey.list({ limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMyScrapFeedList({
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
      };
    },
  });
