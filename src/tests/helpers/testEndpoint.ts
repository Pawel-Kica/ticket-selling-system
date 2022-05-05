import { join } from 'path';
import { readFileSync } from 'fs';
import { equalToRes, equalToType } from '../../@types/tests/exceptions.types';
import { expectToEqualError, expectToEqualRes } from './customExpections';
import { getTestToken, setTestToken } from './setGlobals';

export const afterTest = (res: any, equalTo: equalToType) => {
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
