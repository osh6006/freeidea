import { RedirectType, notFound, redirect } from 'next/navigation';

import { PATH } from '@/constants/path';

import { request as defaultRequest, requestWithTokenRefresh } from './request';

const request = <T>(...args: Parameters<typeof defaultRequest>) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return defaultRequest<T>(...args);
  }
  return requestWithTokenRefresh<T>(...args);
};

const api = {
  async get<T>(url: string, init?: RequestInit) {
    const res = await request<T>({
      method: 'GET',
      url,
      config: init,
    });
    const isServer = typeof window === 'undefined';
    if (isServer && res.status === 403) {
      redirect(PATH.unauthorized, RedirectType.replace);
    }
    if (isServer && res.status === 404) {
      notFound();
    }
    return res;
  },

  async post<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'POST', url, config: init });
  },

  async put<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'PUT', url, config: init });
  },

  async patch<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'PATCH', url, config: init });
  },

  async delete<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'DELETE', url, config: init });
  },

  async postForm<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'POST', url, config: init, form: true });
  },

  async putForm<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'PUT', url, config: init, form: true });
  },

  async patchForm<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'PATCH', url, config: init, form: true });
  },

  async deleteForm<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'DELETE', url, config: init, form: true });
  },

  async head<T>(url: string, init?: RequestInit) {
    return request<T>({ method: 'HEAD', url, config: init });
  },
};

export default api;
