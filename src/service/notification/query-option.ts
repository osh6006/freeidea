import { NotificationType } from '@/types/notification';

export const notificationQueryKey = {
  all: ['notification'],
  lists: () => [...notificationQueryKey.all, 'list'],
  list: (notificationType: NotificationType) => [
    ...notificationQueryKey.lists(),
    notificationType,
  ],
};
