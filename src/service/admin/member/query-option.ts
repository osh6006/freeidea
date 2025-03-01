import { getNextPageParam } from '@/lib/tanstack-query-helper';
import {
  IAdminMemberParams,
  IAdminMembershipParams,
} from '@/types/admin/member';
import { IPagination } from '@/types/common';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import {
  getAdminMemberDetail,
  getAdminMemberList,
  getAdminMembershipList,
} from './service';

export const adminMemberQueryKey = {
  all: ['authorApproval'],

  lists: () => [...adminMemberQueryKey.all, 'list'],
  list: (filter: IAdminMemberParams) =>
    [...adminMemberQueryKey.lists(), 'member', filter].filter(
      (v) => v !== undefined
    ),

  membershipList: (id: string, params: IAdminMembershipParams) =>
    [...adminMemberQueryKey.lists(), 'memberShip', id, params].filter(
      (v) => v !== undefined
    ),

  details: () => [...adminMemberQueryKey.all, 'detail'],
  detail: (id: string) => [...adminMemberQueryKey.details(), id],
};

export const adminMemberListQueryOption = (params: IAdminMemberParams) => {
  return queryOptions({
    queryKey: adminMemberQueryKey.list(params),
    queryFn: () => getAdminMemberList(params),
  });
};

export const adminMemberDetailQueryOption = (userId: string) => {
  return queryOptions({
    queryKey: adminMemberQueryKey.detail(userId),
    queryFn: () => getAdminMemberDetail(userId),
  });
};

export const adminMemberShipPaymentQueryOption = (
  userId: string,
  params: {
    limit?: number;
  }
) => {
  return infiniteQueryOptions({
    queryKey: adminMemberQueryKey.membershipList(userId, params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAdminMembershipList(userId, {
        page: pageParam,
      }),
    getNextPageParam: ({ page, count }) => getNextPageParam({ page, count }),
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });
};
