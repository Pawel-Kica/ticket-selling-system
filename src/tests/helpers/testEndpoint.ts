// Types
import { Response } from 'supertest';
import { equalToRes, equalToType } from '../../@types/tests/expectations.types';
// Tools
import { getTestToken, setTestTokenRes } from './setGlobals';
import { expectToEqualRes, expectToEqualError } from './betterExpectations';
// Responses
import { ForbiddenError, SuccessTestResponse } from './responses.dto';

export const afterTest = (res: Response, equalTo: equalToType) => {
  setTestTokenRes(res);
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
) {
  const res = await global.request
    .post(`${endpoint}`)
    .set('Authorization', getTestToken())
    .send(data);

  afterTest(res, equalTo);
  return res;
}

export async function testPUTRequest(
  endpoint: string,
  data: any,
  equalTo: equalToType,
) {
  const res = await global.request
    .put(`${endpoint}`)
    .set('Authorization', getTestToken())
    .send(data);

  afterTest(res, equalTo);
  return res;
}
export async function testDELETERequest(
  endpoint: string,
  data: any,
  equalTo: equalToType,
) {
  const res = await global.request
    .delete(`${endpoint}`)
    .set('Authorization', getTestToken())
    .send(data);

  afterTest(res, equalTo);
  return res;
}

export async function testAuthEndpoint(
  success: boolean,
  url: string,
  error = ForbiddenError,
) {
  const result = success ? SuccessTestResponse : error;

  await testPOSTRequest(`/${url}/auth`, {}, result);
}
