import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse, Pagination } from '@/types/common';
import { Notification, NotificationType } from '@/types/notification';

export async function getNotificationList(params: {
  page?: number;
  limit?: number;
  notificationType?: NotificationType;
}) {
  const queryString = objectToQueryString(params);
  const response = await api.get(`/user/notification?${queryString}`);
  const { data, code, message }: IAPIResponse<Pagination<Notification[]>> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}

export async function readNotification(body: {
  notificationType: NotificationType;
}) {
  const response = await api.post(`/user/notification`, {
    body: JSON.stringify(body),
  });
  const { data, code, message }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}
