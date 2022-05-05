import { Request, Response } from 'express';

export function removeTestToken() {
  global.test_token = '';
}
export function setTestToken(token: string) {
  global.test_token = token;
}
export function getTestToken() {
  return global.test_token;
}
export function getAuthToken(req: Request) {
  return req.headers.authorization.split(' ').reverse()[0];
}
export function setAuthToken(res: Response, token: string) {
  res.setHeader('Bearer', token);
}
