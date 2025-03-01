import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path';
import { EventWriteBodyType, IAdminEventParams } from '@/types/admin/event';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminEventListOption, adminEventQueryKey } from './query-option';
import {
  createEvent,
  deleteEvent,
  toggleEventUse,
  updateEvent,
} from './service';

export const useAdminEventListQuery = (params: IAdminEventParams) => {
  return useQuery(adminEventListOption(params));
};

export const useCreateEventMutation = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (body: EventWriteBodyType) => createEvent(body),
    onSuccess: () => {
      replace(PATH.adminEvents);
    },
  });
};

export const useUpdateEventMutation = () => {
  const { replace, refresh } = useRouter();

  return useMutation({
    mutationFn: ({
      eventId,
      body,
    }: {
      eventId: string;
      body: EventWriteBodyType;
    }) => updateEvent(eventId, body),
    onSuccess: () => {
      replace(PATH.adminEvents);
      refresh();
    },
  });
};

export const useToggleEventMutation = () => {
  return useMutation({
    mutationFn: ({
      eventIds,
      isUsed,
    }: {
      eventIds: string[];
      isUsed: boolean;
    }) =>
      toggleEventUse({
        eventIds,
        isUsed,
      }),
  });
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventIds: string[]) =>
      deleteEvent({
        eventIds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminEventQueryKey.lists(),
      });
    },
  });
};
