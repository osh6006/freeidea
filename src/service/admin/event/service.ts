import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import {
  EventWriteBodyType,
  IAdminEventDetail,
  IAdminEventParams,
  IAdminEventWithPage,
} from '@/types/admin/event';
import { IAPIResponse } from '@/types/common';

export async function createEvent(body: EventWriteBodyType) {
  const res = await api.post(`/admin/event`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getAdminEventList(params: IAdminEventParams) {
  const queryString = objectToQueryString(params);

  const res = await api.get(`/admin/event?${queryString}`);

  const { data, code, message }: IAPIResponse<IAdminEventWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 작가 승인 리스트 오류'));
  }

  return data;
}

export async function updateEvent(eventId: string, body: EventWriteBodyType) {
  const res = await api.put(`/admin/event/${eventId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function toggleEventUse(body: {
  eventIds: string[];
  isUsed: boolean;
}) {
  const res = await api.post(`/admin/event/showing`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function deleteEvent(body: { eventIds: string[] }) {
  const res = await api.post(`/admin/event/delete`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

// Detail
export async function getAdminEventDetail(eventId: string) {
  const res = await api.get(`/admin/event/${eventId}`, {
    cache: 'no-store',
  });
  const { data, message, code }: IAPIResponse<IAdminEventDetail> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}
