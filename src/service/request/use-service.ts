import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import APIError from '@/lib/api-error';
import { ApplySchemaType } from '@/lib/zod/request/apply-schema';
import {
  applyRequest,
  createRequest,
  deleteRequest,
  updateRequest,
} from '@/service/request/service';
import { IRequestListParam, RequestToServerType } from '@/types/request';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  requestDetailOption,
  requestListOption,
  requestQueryKey,
} from './query-option';

export function useRequestListQuery(params: Omit<IRequestListParam, 'page'>) {
  return useInfiniteQuery(requestListOption(params));
}

export function useCreateRequestMutation() {
  const { push } = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: RequestToServerType) => createRequest(data),
    onSuccess: (data) => {
      push(PATH.requestDetail(data));
    },
  });
}

export function useUpdateRequestMutation() {
  const { toast } = useToast();

  const { push, refresh } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RequestToServerType }) =>
      updateRequest(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: requestQueryKey.details() });
      push(PATH.requestDetail(data));
      refresh();
    },
  });
}

export function useApplyRequestMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApplySchemaType }) =>
      applyRequest(id, data),
  });
}

export function useDeleteRequestMutation() {
  const { toast } = useToast();
  const { replace, refresh } = useRouter();
  return useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: () => {
      replace(PATH.request);
      refresh();
    },
  });
}

export function useRequestDetailQuery(id: string) {
  return useQuery(requestDetailOption(id));
}
