import { join } from 'path';
import { readFileSync } from 'fs';
import { Response } from 'supertest';
import { ForbiddenError } from './responses';
import { getTestToken, setTestToken } from './setGlobals';
import { equalToRes, equalToType } from '../../@types/tests/exceptions.types';
import { expectToEqualRes, expectToEqualError } from './betterExceptions';
import { HttpStatus } from '@nestjs/common';
import { SuccessResponse } from '../../utils/responses';

export const afterTest = (res: Response, equalTo: equalToType) => {
  setTestToken(res);
  if ('omit' in equalTo) return expectToEqualRes(res, equalTo as equalToRes);
  expectToEqualError(res, equalTo);
};

export async function testGETRequest(endpoint: string, equalTo: equalToType) {
  const res = await global.request
    .get(`${endpoint}`)
    .set('Authorization', getTestToken());
  afterTest(res, equalTo);
  return res;
}

export async function testPOSTRequest(
  endpoint: string,
  data: any,
  equalTo: equalToType,
  fileName = '',
) {
  let buffer: any = '';
  if (fileName)
    buffer = readFileSync(join(__dirname, '..', 'data', 'files', fileName));

  const res = await global.request
    .post(`${endpoint}`)
    .set('Authorization', getTestToken())
    .send(data);

  afterTest(res, equalTo);
  return res;
}

export async function testAuthEndpoint(success: boolean, url: string) {
  const result = success
    ? { data: SuccessResponse, status: HttpStatus.OK, omit: [] }
    : ForbiddenError;

  await testPOSTRequest(`/${url}/auth`, {}, result);
}
