import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import {
  ChatMessage,
  ChatMessageRequest,
  ChatRoom,
  ChatRoomDetail,
} from '@/types/chat';
import { IAPIResponse, Pagination } from '@/types/common';

export async function getChatRoomList({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString({ page, limit });
  const response = await api.get(`/user/chat/room?${queryString}`);
  const { data, message, code }: IAPIResponse<Pagination<ChatRoom[]>> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getChatRoom(chatRoomId: string) {
  const response = await api.get(`/user/chat/room/${chatRoomId}`);
  const { data, message, code }: IAPIResponse<ChatRoomDetail> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getUserChatRoom(userId: string) {
  const response = await api.get(`/user/chat/room/user/${userId}`);
  const { data, message, code }: IAPIResponse<ChatRoomDetail> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getChatRoomMessages(
  id: string,
  { page, limit }: { page?: number; limit?: number }
) {
  const queryString = objectToQueryString({ page, limit });
  const response = await api.get(`/user/chat/message/${id}?${queryString}`);
  const { data, message, code }: IAPIResponse<Pagination<ChatMessage[]>> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function sendChatMessage(body: ChatMessageRequest) {
  const response = await api.post(`/user/chat/message`, {
    body: JSON.stringify(body),
  });
  const { data, message, code }: IAPIResponse<{ chatRoomId: string }> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return data;
}

export async function readChatMessage(chatRoomId: string) {
  const response = await api.post(`/user/chat/message/read/${chatRoomId}`);
  const { message, code }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return { chatRoomId };
}

export async function leaveChatRoom(chatRoomId: string) {
  const response = await api.post(`/user/chat/room/leave/${chatRoomId}`);
  const { data, message, code }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return data;
}
