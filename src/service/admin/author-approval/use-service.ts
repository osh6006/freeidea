import { IAuthorApprovalParams } from '@/types/admin/author-approval';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  authorApprovalDetailOption,
  authorApprovalListOption,
  authorApprovalQueryKey,
} from './query-option';
import { putAtuhorApply } from './service';

export const useAuthorApprovalListQuery = (params: IAuthorApprovalParams) => {
  return useQuery(authorApprovalListOption(params));
};

export const useAuthorApprovalDetailQuery = (id: string, isOpen: boolean) => {
  return useQuery(authorApprovalDetailOption(id, isOpen));
};

export const useAuthorApprovalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { authorApplyIds: string[]; isApproved: boolean }) =>
      putAtuhorApply(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authorApprovalQueryKey.details(),
      });
      queryClient.invalidateQueries({
        queryKey: authorApprovalQueryKey.lists(),
      });
    },
  });
};
