/* eslint-disable no-var */
import { supertest } from 'supertest';

declare global {
  var request: supertest.SuperTest<supertest.Test>;
  var test_accessToken: string;
  var test_refreshToken: string;
}
