import { useEffect } from 'react';

import { SOCKET_EVENT } from '@/constants/socket';
import { chatQueryKey } from '@/service/chat/query-option';
import { ChatRoom } from '@/types/chat';
import { IAPIResponse } from '@/types/common';
import { useQueryClient } from '@tanstack/react-query';

import { useSocketConnect } from './use-socket-connect';

export function useChatRoomListSocket(userId?: string) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocketConnect();

  useEffect(() => {
    if (!userId || !isConnected) return;

    const handleChatList = ({ data: chatRoom }: IAPIResponse<ChatRoom>) => {
      queryClient.refetchQueries({
        queryKey: chatQueryKey.roomList(),
      });
    };

    socket.on(SOCKET_EVENT.chatRoom(userId), handleChatList);
    return () => {
      socket.off(SOCKET_EVENT.chatRoom(userId), handleChatList);
    };
  }, [socket, userId, isConnected, queryClient]);

  return { socket, isConnected };
}
