import { SECOND } from '@/constants/time';
import { getNewToken } from '@/service/auth/service';
import { differenceInMinutes } from 'date-fns';

import { deleteCookie, getCookie, setCookie } from './cookie';
import { getKstNow } from './date';
import { decodeToken } from './utils';

export async function setJwtCookies(accessToken: string, refreshToken: string) {
  const { exp: accessTokenExp } = decodeToken(accessToken);
  const { exp: refreshTokenExp } = decodeToken(refreshToken);
  const accessTokenExpDate = new Date(accessTokenExp * SECOND);
  const refreshTokenExpDate = new Date(refreshTokenExp * SECOND);
  await Promise.all([
    setCookie({
      name: 'accessToken',
      value: accessToken,
      expires: accessTokenExpDate,
    }),
    setCookie({
      name: 'refreshToken',
      value: refreshToken,
      expires: refreshTokenExpDate,
    }),
  ]);
}

export async function deleteJwtCookies() {
  await Promise.all([
    deleteCookie('accessToken'),
    deleteCookie('refreshToken'),
  ]);
}

export function isNeedRefresh(tokens: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}): tokens is { accessToken: string | undefined; refreshToken: string } {
  const { accessToken, refreshToken } = tokens;
  if (!accessToken && refreshToken) return true;
  if (!accessToken) return false;

  const { exp: accessExp } = accessToken
    ? decodeToken(accessToken)
    : { exp: 0 };

  const remainMinutes = differenceInMinutes(
    new Date(accessExp * SECOND),
    getKstNow()
  );

  return remainMinutes <= 10;
}
