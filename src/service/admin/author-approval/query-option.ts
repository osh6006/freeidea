import { IAuthorApprovalParams } from '@/types/admin/author-approval';
import { queryOptions } from '@tanstack/react-query';

import { getAuthorApprovalDetail, getAuthorApprovalList } from './service';

export const authorApprovalQueryKey = {
  all: ['authorApproval'],

  lists: () => [...authorApprovalQueryKey.all, 'list'],
  list: (filter: IAuthorApprovalParams) =>
    [...authorApprovalQueryKey.lists(), filter].filter((v) => v !== undefined),

  details: () => [...authorApprovalQueryKey.all, 'detail'],
  detail: (id: string) => [...authorApprovalQueryKey.details(), id],
};

export const authorApprovalListOption = (params: IAuthorApprovalParams) => {
  return queryOptions({
    queryKey: authorApprovalQueryKey.list(params),
    queryFn: () => getAuthorApprovalList(params),
  });
};

export const authorApprovalDetailOption = (id: string, isOpen: boolean) => {
  return queryOptions({
    queryKey: authorApprovalQueryKey.detail(id),
    queryFn: () => getAuthorApprovalDetail(id),
    enabled: isOpen,
  });
};
