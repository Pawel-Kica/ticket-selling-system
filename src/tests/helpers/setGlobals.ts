import { Response } from 'supertest';
import { sign } from 'jsonwebtoken';

export function removeTestToken() {
  global.test_token = '';
}
export function setTestTokenRes(res: Response) {
  if (res.body.token) global.test_token = res.body.token;
}
export function generateTestToken(id: string) {
  global.test_token = sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.TOKEN_TTL,
  });
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
