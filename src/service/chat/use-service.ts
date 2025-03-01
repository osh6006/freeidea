import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { getNextPageParam } from '@/lib/tanstack-query-helper';
import { ChatRoom } from '@/types/chat';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useMyInfoQuery } from '../auth/use-service';
import { chatQueryKey } from './query-option';
import {
  getChatRoom,
  getChatRoomList,
  getChatRoomMessages,
  getUserChatRoom,
  leaveChatRoom,
  readChatMessage,
  sendChatMessage,
} from './service';

export function useSendChatMutation() {
  return useMutation({
    mutationFn: sendChatMessage,
  });
}

export function useChatRoomMessages(chatRoomId?: string) {
  const enabled = !!chatRoomId;

  return useInfiniteQuery({
    queryKey: chatQueryKey.roomMessage(chatRoomId!),
    queryFn: enabled
      ? ({ pageParam }) =>
          getChatRoomMessages(chatRoomId, { page: pageParam, limit: 10 })
      : undefined,
    initialPageParam: 1,
    enabled,
    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap((page) => page.list),
    }),
    getNextPageParam: ({ page, count }) => getNextPageParam({ page, count }),
  });
}

export function useChatRoom(chatRoomId: string) {
  return useQuery({
    queryKey: chatQueryKey.room(chatRoomId),
    queryFn: () => getChatRoom(chatRoomId),
  });
}

export function useUserChatRoom(userId?: string) {
  const enabled = !!userId;

  return useQuery({
    queryKey: chatQueryKey.userRoom(userId!),
    queryFn: enabled ? () => getUserChatRoom(userId) : undefined,
    enabled,
  });
}

export function useChatRoomList() {
  return useInfiniteQuery({
    queryKey: chatQueryKey.roomList(),
    queryFn: ({ pageParam }) => getChatRoomList({ page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: ({ page, count }) => getNextPageParam({ page, count }),
    select: (data) => ({
      ...data,
      flattenList: data.pages.flatMap((page) => page.list),
    }),
  });
}

export function useReadChatMessage() {
  const { data: myInfo } = useMyInfoQuery();
  const { setInfinitePageQueriesData } = useOptimisticUpdate();

  return useMutation({
    mutationFn: readChatMessage,
    onSuccess: ({ chatRoomId }) => {
      setInfinitePageQueriesData<ChatRoom>(
        {
          queryKey: chatQueryKey.roomList(),
        },
        {
          target: (item) =>
            item.chatRoomId === chatRoomId &&
            item.lastMessage.userId !== myInfo?.userId,
          updater: (item) => ({
            ...item,
            lastMessage: { ...item.lastMessage, isReceiverRead: true },
          }),
        }
      );
    },
  });
}

export function useLeaveChatRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatQueryKey.roomList(),
      });
    },
  });
}
