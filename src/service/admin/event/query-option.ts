import { IAdminEventParams } from '@/types/admin/event';
import { queryOptions } from '@tanstack/react-query';

import { getAdminEventDetail, getAdminEventList } from './service';

export const adminEventQueryKey = {
  all: ['adminEvent'],

  lists: () => [...adminEventQueryKey.all, 'list'],
  list: (filter: IAdminEventParams) =>
    [...adminEventQueryKey.lists(), filter].filter((v) => v !== undefined),

  detail: (id: string) => [...adminEventQueryKey.all, id],
};

export const adminEventListOption = (params: IAdminEventParams) => {
  return queryOptions({
    queryKey: adminEventQueryKey.list(params),
    queryFn: () => getAdminEventList(params),
  });
};

export const adminEventDetailOption = (id: string) => {
  return queryOptions({
    queryKey: adminEventQueryKey.detail(id),
    queryFn: () => getAdminEventDetail(id),
  });
};
