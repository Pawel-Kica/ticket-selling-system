// Types
import { Response } from 'supertest';
// Tools
import { sign } from 'jsonwebtoken';
// Data
import {
  adminUserId,
  bossUserId,
  managerUserId,
  testUserId,
} from '../data/id.test.data';

export function removeTestToken() {
  global.test_token = '';
}
export function getTestToken(): string {
  return global.test_token;
}
export function generateTestToken(id: string) {
  global.test_token = sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.TOKEN_TTL,
  });
}
export function generateAdminToken() {
  generateTestToken(adminUserId);
}
export function generateBossToken() {
  generateTestToken(bossUserId);
}
export function generateManagerToken() {
  generateTestToken(managerUserId);
}
export function generateUserToken() {
  generateTestToken(testUserId);
}

export function setTestTokenRes(res: Response) {
  if (res.body.token) global.test_token = res.body.token;
}

export function getAuthToken(req: any): string {
  try {
    return req.headers.authorization.split(' ').reverse()[0];
  } catch (_e) {
    return '';
  }
}
