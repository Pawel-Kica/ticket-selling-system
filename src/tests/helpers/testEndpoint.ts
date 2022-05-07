import { Response } from 'supertest';
import { ForbiddenError, SuccessTestResponse } from './responses';
import { getTestToken, setTestTokenRes } from './setGlobals';
import { equalToRes, equalToType } from '../../@types/tests/exceptions.types';
import { expectToEqualRes, expectToEqualError } from './betterExceptions';

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
  fileName = '',
) {
  // let buffer: any = '';
  // if (fileName)
  //   buffer = readFileSync(join(__dirname, '..', 'data', 'files', fileName));

  const res = await global.request
    .post(`${endpoint}`)
    .set('Authorization', getTestToken())
    .send(data);

  afterTest(res, equalTo);
  return res;
}

export async function testPATCHRequest(
  endpoint: string,
  data: any,
  equalTo: equalToType,
) {
  const res = await global.request
    .patch(`${endpoint}`)
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
