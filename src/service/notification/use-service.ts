import { getNextPageParam } from '@/lib/tanstack-query-helper';
import { NotificationType } from '@/types/notification';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { notificationQueryKey } from './query-option';
import { getNotificationList, readNotification } from './service';

export function useNotificationList(notificationType: NotificationType) {
  return useInfiniteQuery({
    queryKey: notificationQueryKey.list(notificationType),
    queryFn: ({ pageParam }) =>
      getNotificationList({ page: pageParam, limit: 10, notificationType }),
    initialPageParam: 1,
    getNextPageParam: ({ page, count }) => getNextPageParam({ page, count }),
    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap(({ list }) => list),
    }),
  });
}

export function useReadNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: readNotification,
    onSuccess: (_, { notificationType }) => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKey.list(notificationType),
      });
    },
  });
}
