import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import {
  StoreListType,
  TCompletePaymentResult,
  TStoreReviewList,
} from '@/types/store';
import { WorkDetailType, WorkEditDataType } from '@/types/work';

export async function getStoreDetail(id: string) {
  const res = await api.get(`/user/store/product/${id}`);
  const { code, message, data }: IAPIResponse<WorkDetailType> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('cannot get store detail'));
  }

  return data;
}

export async function getStoreList(params: {
  page?: number;
  category?: string;
  sort?: string;
  useRange?: string;
  limit?: number;
}) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/store/product?${queryString}`);
  const { data, code, message }: IAPIResponse<StoreListType> = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function completePayment(body: {
  paymentId: string;
  productId: string;
  options: {
    optionName: string;
    optionPrice: number;
    optionQuantity: number;
  }[];
  additionalFee: number;
}) {
  const res = await api.post('/user/store/payment/complete', {
    body: JSON.stringify(body),
  });

  const { data, code, message }: IAPIResponse<TCompletePaymentResult> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return data;
}

export async function getStoreReviewList({
  productId,
  page,
  limit,
}: {
  productId: string;
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString({ productId, page, limit });
  const res = await api.get(
    `/user/store/product/comments/${productId}?${queryString}`
  );

  const { data, message, code }: IAPIResponse<TStoreReviewList> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  return data;
}

export async function createStoreReview(
  productId: string,
  body: { comment: string }
) {
  const res = await api.post(`/user/store/product/comments/${productId}`, {
    body: JSON.stringify(body),
  });

  const { data, message, code }: IAPIResponse = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getStoreEditData(id: string) {
  const res = await api.get(`/user/store/product/article/${id}`);

  const { data, message, code }: IAPIResponse<WorkEditDataType> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function deleteStore(id: string) {
  const res = await api.delete(`/user/store/product/${id}`);
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return id;
}

export async function deleteStoreReview(id: string) {
  const res = await api.delete(`/user/store/product/comments/${id}`);
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return id;
}
