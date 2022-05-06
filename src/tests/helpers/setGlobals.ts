import { Response } from 'supertest';

export function removeTestToken() {
  global.test_token = '';
}
export function setTestTokenRes(res: Response) {
  if (res.body.token) setTestToken(res.body.token);
}
export function setTestToken(token: string) {
  global.test_token = token;
}
export function getTestToken(): string {
  return global.test_token;
}
export function getAuthToken(req: any): string {
  try {
    return req.headers.authorization.split(' ').reverse()[0];
  } catch (_e) {
    return '';
  }
}
