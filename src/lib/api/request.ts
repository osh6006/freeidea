import API_CODE from '@/constants/error-code';
import { IAPIResponse } from '@/types/common';

import APIError from '../api-error';
import { getCookie } from '../cookie';
import { setJwtCookies } from '../token';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

class ExtendedResponse<T = unknown> extends Response {
  constructor(
    response: Response,
    public data: T
  ) {
    super(response.body, response);
    Object.assign(this, response);
  }
}

export async function request<T>({
  method,
  url,
  config,
  form = false,
  token,
}: {
  method: string;
  url: string;
  config?: RequestInit;
  form?: boolean;
  token?: string;
}) {
  const cookie = await getCookie('accessToken');
  const accessToken = token || cookie?.value;
  const bearerToken = accessToken ? `Bearer ${accessToken}` : null;
  const fullUrl =
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `${baseUrl}${url}`;

  const res = await fetch(fullUrl, {
    method,
    ...config,
    headers: {
      ...(form ? {} : { 'Content-Type': 'application/json' }),
      ...(bearerToken ? { Authorization: bearerToken } : null),
      ...config?.headers,
    },
  });

  const cloned = res.clone();
  const { data, code, message }: IAPIResponse<T> = await cloned.json();
  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  return new ExtendedResponse(res, data);
}

let isRefreshing = false;
let pendingRequests: ((token?: string) => void)[] = [];

export async function requestWithTokenRefresh<T>({
  method,
  url,
  config,
  form = false,
}: {
  method: string;
  url: string;
  config?: RequestInit;
  form?: boolean;
}) {
  try {
    const res = await request<T>({ method, url, config, form });
    return res;
  } catch (error) {
    if (
      !(
        error instanceof APIError &&
        error.code === API_CODE.ACCESS_TOKEN_FAILURE
      )
    )
      throw error;

    const originalPromise = new Promise<ExtendedResponse<T>>(
      (resolve, reject) => {
        pendingRequests.push((token?: string) => {
          request<T>({ method, url, config, form, token })
            .then(resolve)
            .catch(reject);
        });
      }
    );

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await getNewToken();
        await setJwtCookies(newToken.accessToken, newToken.refreshToken);
        pendingRequests.forEach((request) => request(newToken.accessToken));
      } catch {
        pendingRequests.forEach((request) => request());
      } finally {
        isRefreshing = false;
        pendingRequests = [];
      }
    }

    const res = await originalPromise;
    return res;
  }
}

async function getNewToken() {
  const cookie = await getCookie('refreshToken');
  const refreshToken = cookie?.value;
  const res = await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  const newToken: IAPIResponse<{ accessToken: string; refreshToken: string }> =
    await res.json();

  if (newToken.code !== API_CODE.success) {
    throw new APIError({ message: newToken.message, code: newToken.code });
  }

  return newToken.data;
}
