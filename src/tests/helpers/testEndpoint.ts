import { equalToRes, equalToType } from '../../@types/tests';
import { COOKIES_NAME } from '../../config/cookies.config';
import { expectToEqualError, expectToEqualRes } from './customExpections';
import { setAuthGlobals } from './setGlobals';

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIES_NAME;

export const afterTest = (res: any, equalTo: equalToType) => {
  setAuthGlobals(res);

  if ('omit' in equalTo) return expectToEqualRes(res, equalTo as equalToRes);

  expectToEqualError(res, equalTo);
};

export async function testGETRequest(endpoint: string, equalTo: equalToType) {
  const res = await global.request
    .get(`${endpoint}`)
    .set('Cookie', [
      `${ACCESS_TOKEN}=${global.testAccessToken}`,
      `${REFRESH_TOKEN}=${global.testRefreshToken}`,
    ]);

  afterTest(res, equalTo);

  return res;
}
