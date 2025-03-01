import { MINUTE } from '@/constants/time';
import { queryOptions } from '@tanstack/react-query';

import { getMyInfo } from './service';

export const signUpMutationKey = {
  verifyAlimCode: ['verifyAlimCode'],
};

export const myInfoQueryKey = ['my-info'];
export const myInfoQueryOption = queryOptions({
  queryKey: myInfoQueryKey,
  queryFn: getMyInfo,
  retry: false,
  staleTime: 10 * MINUTE,
});
