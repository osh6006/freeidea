'use server';

import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name);
};

export const setCookie = async ({
  name,
  value,
  expires,
}: {
  name: string;
  value: string;
  expires?: number | Date;
}) => {
  cookies().set({
    name,
    value,
    httpOnly: true,
    path: '/',
    expires,
    secure: true,
    sameSite: 'lax',
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  });
};

export const deleteCookie = async (key: string) => {
  cookies().delete({
    name: key,
    path: '/',
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  });
};

export const hasCookie = async (key: string) => {
  const cookieStore = cookies();
  return cookieStore.has(key);
};
