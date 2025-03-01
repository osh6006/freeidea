import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { IAPIResponse } from '@/types/common';

export async function workScrapToggle(id: string, isScrapping: boolean) {
  const res = await api.post(`/user/store/product/scrap/${id}`, {
    body: JSON.stringify({
      isScrapping,
    }),
  });

  const data: IAPIResponse = await res.json();

  if (data.code !== API_CODE.success)
    throw new APIError({ message: data.message, code: data.code });

  return { isScrapping };
}
