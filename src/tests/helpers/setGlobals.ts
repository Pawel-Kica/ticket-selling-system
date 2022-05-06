import { Response } from 'express';

export function removeTestToken() {
  global.test_token = '';
}
export function setTestToken(res: Response) {
  const token = getAuthToken(res);
  global.test_token = token ? token : global.test_token;
}
export function getTestToken(): string {
  return global.test_token;
}
export function getAuthToken(resq: any): string {
  try {
    return resq.headers.authorization.split(' ').reverse()[0];
  } catch (_e) {
    return '';
  }
}
export function setAuthToken(res: Response, token: string) {
  res.setHeader('Bearer', token);
}
