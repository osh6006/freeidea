import { NotificationType } from '@/types/notification';

export const SOCKET_EVENT = {
  chatRoom: (userId: string) => `chat-list-${userId}`,
  chatMessage: (chatRoomId: string) => `chat-room-${chatRoomId}`,
  notification: ({
    userId,
    type,
  }: {
    userId: string;
    type: NotificationType;
  }) => `notification-${type}-${userId}`,
};
