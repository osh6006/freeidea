import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { IAPIResponse } from '@/types/common';
import { WorkNewRequestType } from '@/types/work';

export async function createWork(body: WorkNewRequestType) {
  const res = await api.post('/user/store/product', {
    body: JSON.stringify(body),
  });

  const { code, message, data }: IAPIResponse<{ productId: string }> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ code, message });

  return data;
}

export async function updateWork(id: string, body: WorkNewRequestType) {
  const res = await api.put(`/user/store/product/${id}`, {
    body: JSON.stringify(body),
  });

  const { code, message }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });

  return true;
}
