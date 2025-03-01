import { useEffect, useState } from 'react';

import { SOCKET_EVENT } from '@/constants/socket';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { IAPIResponse } from '@/types/common';
import { Notification, NotificationType } from '@/types/notification';

import { useSocketConnect } from './use-socket-connect';

export default function useNotificationSocket(type: NotificationType) {
  const { data: myInfo } = useMyInfoQuery();
  const { socket, isConnected } = useSocketConnect();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!isConnected || !myInfo?.userId) return;

    const handleNotification = ({ data }: IAPIResponse<Notification>) => {
      setNotifications((prev) => [...prev, data]);
    };

    socket.on(
      SOCKET_EVENT.notification({ userId: myInfo.userId, type }),
      handleNotification
    );
    return () => {
      socket.off(SOCKET_EVENT.notification({ userId: myInfo.userId, type }));
    };
  }, [socket, isConnected, myInfo?.userId, type]);

  return { notifications };
}
