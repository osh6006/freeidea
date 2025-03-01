import { useEffect, useState } from 'react';

import { SOCKET_EVENT } from '@/constants/socket';
import { ChatMessage } from '@/types/chat';
import { IAPIResponse } from '@/types/common';

import { useSocketConnect } from './use-socket-connect';

export function useChatSocket(
  chatRoomId?: string,
  options?: {
    onReceiveMessage: (data: ChatMessage) => void;
  }
) {
  const { socket, isConnected } = useSocketConnect();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!chatRoomId || !isConnected) return;

    const handleMessage = ({ data }: IAPIResponse<ChatMessage>) => {
      setMessages((prev) => [data, ...prev]);
      options?.onReceiveMessage?.(data);
    };

    socket.on(SOCKET_EVENT.chatMessage(chatRoomId), handleMessage);
    return () => {
      socket.off(SOCKET_EVENT.chatMessage(chatRoomId), handleMessage);
    };
  }, [socket, chatRoomId, isConnected, options]);

  return { socket, isConnected, messages };
}
