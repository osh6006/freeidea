import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import { createWork, updateWork } from '@/service/work-new/service';
import { WorkNewRequestType } from '@/types/work';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { myInfoQueryKey } from '../auth/query-option';
import { storeQueryKey } from '../store/query-option';

export function useCreateWorkMutation() {
  const { push } = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkNewRequestType) => createWork(data),
    onSuccess: ({ productId }) => {
      queryClient.invalidateQueries({
        queryKey: myInfoQueryKey,
      });
      push(PATH.workDetail(productId));
    },
  });
}

export function useUpdateWorkMutation(id: string) {
  const { toast } = useToast();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkNewRequestType) => updateWork(id, body),
    onSuccess: () => {
      push(PATH.workDetail(id));
      queryClient.invalidateQueries({
        queryKey: myInfoQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: storeQueryKey.detail(id),
      });
    },
  });
}
