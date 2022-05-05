import { Response } from 'express';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../config/cookies.config';

export function removeAuthGlobals() {
  global.test_accessToken = '';
  global.test_refreshToken = '';
}

export function serializeCookies(cookies: string) {
  const serialized = cookies.split(';').map((e: any) => e.trim().split('='));
  const cookies_object: { [key: string]: string } = {};

  serialized.forEach((e: any) => {
    if (e[0] === ACCESS_TOKEN || e[0] === REFRESH_TOKEN) {
      const type = e[0] === ACCESS_TOKEN ? ACCESS_TOKEN : REFRESH_TOKEN;
      cookies_object[type] = e[1];
    }
  });
  return cookies_object;
}

export function getAuthCookies(res: Response) {
  try {
    const cookies_header = res.header['set-cookie'];
    return serializeCookies(cookies_header);
  } catch (_e) {
    return {};
  }
}

export function setAuthGlobals(res: Response) {
  const { accessToken, refreshToken } = getAuthCookies(res);
  global.test_accessToken = accessToken;
  global.test_refreshToken = refreshToken;
}
