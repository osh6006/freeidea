import { IAdminMemberParams } from '@/types/admin/member';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  adminMemberDetailQueryOption,
  adminMemberListQueryOption,
  adminMemberQueryKey,
  adminMemberShipPaymentQueryOption,
} from './query-option';
import { toggleUserActive } from './service';

export const useAdminMemberlListQuery = (params: IAdminMemberParams) => {
  return useQuery(adminMemberListQueryOption(params));
};

export const useAdminMemberDetailQuery = (userId: string) => {
  return useQuery(adminMemberDetailQueryOption(userId));
};

export const useUserToggleActiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      toggleUserActive(userId, {
        isActive,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminMemberQueryKey.lists(),
      });
    },
  });
};

export const useAdminMembershipPaymentQuery = (
  userId: string,
  params: { limit?: number }
) => {
  return useInfiniteQuery(adminMemberShipPaymentQueryOption(userId, params));
};
