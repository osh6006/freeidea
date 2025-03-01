import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import {
  IAuthorApprovalDetail,
  IAuthorApprovalParams,
  IAuthorApprovalWithPage,
} from '@/types/admin/author-approval';
import { IAPIResponse } from '@/types/common';

export async function getAuthorApprovalList(params: IAuthorApprovalParams) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/admin/author/apply?${queryString}`);

  const { data, code, message }: IAPIResponse<IAuthorApprovalWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 작가 승인 리스트 오류'));
  }

  return data;
}

export async function getAuthorApprovalDetail(id: string) {
  const res = await api.get(`/admin/author/apply/${id}`);

  const { data, code, message }: IAPIResponse<IAuthorApprovalDetail> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 작가 승인 신청서 오류'));
  }

  return data;
}

export async function putAtuhorApply(body: {
  authorApplyIds: string[];
  isApproved: boolean;
}) {
  const res = await api.put(`/admin/author/apply`, {
    body: JSON.stringify(body),
  });

  const { code, message }: IAPIResponse<IAuthorApprovalDetail> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('관리자 작가 승인 오류'));
  }
}
