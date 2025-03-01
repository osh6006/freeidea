import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myInfoQueryKey } from '../auth/query-option';
import { mypageQueryKey } from '../mypage/query-option';
import { membershipMutationKey } from './mutation-option';
import {
  changeMembership,
  registeMembership,
  unregisteMembership,
} from './service';

export function useRegistMembershipMutation() {
  const { push } = useRouter();

  return useMutation({
    mutationKey: membershipMutationKey.payment,
    mutationFn: registeMembership,
    onSuccess: () => {
      push(PATH.membershipPaymentComplete);
    },
  });
}

export function useUnRegistMembershipMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unregisteMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageQueryKey.membership(),
      });
    },
  });
}

export function useChangeMembershipMutation() {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationFn: changeMembership,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: myInfoQueryKey,
      });
      push(PATH.myMemberShip);
    },
  });
}
