export type NotificationType = 'STORE' | 'LOUNGE';

export type Notification = {
  notificationId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};
