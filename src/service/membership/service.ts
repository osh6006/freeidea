import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { IAPIResponse } from '@/types/common';

export async function registeMembership(body: {
  billingKey: string;
  membershipType: string;
}) {
  const response = await api.post('/user/membership', {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return true;
}

export async function unregisteMembership() {
  const response = await api.delete('/user/membership');
  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return true;
}

export async function changeMembership(body: { membershipType: string }) {
  const response = await api.put('/user/membership/reserve', {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return true;
}
