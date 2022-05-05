import { equalToRes, equalToType } from '../../@types/tests/exceptions.types';
import { expectToEqualError, expectToEqualRes } from './customExpections';
import { getTestToken } from './setGlobals';

export const afterTest = (res: any, equalTo: equalToType) => {
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
