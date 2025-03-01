import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { ApplySchemaType } from '@/lib/zod/request/apply-schema';
import { IAPIResponse } from '@/types/common';
import {
  IRequestData,
  IRequestListParam,
  RequestToServerType,
  TRequestDeatilResponse,
} from '@/types/request';

export async function createRequest(body: RequestToServerType) {
  const res = await api.post('/user/inquiry', {
    body: JSON.stringify(body),
  });

  const {
    data,
    message,
    code,
  }: IAPIResponse<{
    inquiryId: string;
  }> = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data.inquiryId;
}

export async function updateRequest(id: string, data: RequestToServerType) {
  const res = await api.post(`/user/inquiry/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return id;
}

export async function getRequestData(params: IRequestListParam) {
  const queryString = objectToQueryString(params);

  const res = await api.get(`/user/inquiry?${queryString}`, {
    cache: 'no-store',
  });

  const { data, message, code }: IAPIResponse<IRequestData> = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('의뢰해요 리스트 오류'));
  }

  return data || [];
}

export async function getRecentlyRequestData(
  requestid: string,
  params: IRequestListParam
) {
  const queryString = objectToQueryString(params);

  const res = await api.get(`/user/inquiry/recent/${requestid}?${queryString}`);

  const { data, message, code }: IAPIResponse<IRequestData> = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('의뢰해요 최근 리스트 오류'));
  }

  return data || [];
}

export async function getRequestDetail(id: string) {
  const res = await api.get(`/user/inquiry/${id}`, {
    cache: 'no-store',
  });

  const { data, message, code }: TRequestDeatilResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('Q&A 상세 오류'));
  }

  return data;
}

export async function deleteRequest(id: string) {
  const res = await api.post(`/user/inquiry/${id}`, {
    method: 'DELETE',
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function applyRequest(id: string, data: ApplySchemaType) {
  const res = await api.post(`/user/inquiry/apply/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}
