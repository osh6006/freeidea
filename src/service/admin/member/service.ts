import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import {
  IAdminMemberDetail,
  IAdminMemberListWithPage,
  IAdminMemberParams,
  IAdminMembershipListWithPage,
  IAdminMembershipParams,
} from '@/types/admin/member';
import { IAPIResponse, IPagination } from '@/types/common';

export async function getAdminMemberList(params: IAdminMemberParams) {
  const queryString = objectToQueryString(params);

  const res = await api.get(`/admin/user?${queryString}`);
  const { data, code, message }: IAPIResponse<IAdminMemberListWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 멤버 리스트 오류'));
  }

  return data;
}

export async function getAdminMemberDetail(userId: string) {
  const res = await api.get(`/admin/user/${userId}`);
  const { data, code, message }: IAPIResponse<IAdminMemberDetail> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 멤버 상세 오류'));
  }

  return data;
}

export async function toggleUserActive(
  userId: string,
  body: {
    isActive: boolean;
  }
) {
  const res = await api.put(`/admin/user/activity/${userId}`, {
    body: JSON.stringify(body),
  });

  const { code, message }: IAPIResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 유저 활성화 변경 오류'));
  }
}

export async function getAdminMembershipList(
  userId: string,
  params: IAdminMembershipParams
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/admin/user/membership/${userId}?${queryString}`);

  const { data, code, message }: IAPIResponse<IAdminMembershipListWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 멤버 상세 오류'));
  }

  return data;
}
