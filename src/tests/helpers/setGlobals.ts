export function removeAuthGlobals() {
  global.accessToken = '';
  global.refreshToken = '';
}

export function setAuthGlobals(res: any) {
  try {
    const cookie_header_length = res.header['set-cookie'].length;

    global.testAccessToken = res.header['set-cookie'][cookie_header_length - 2]
      .split(';')[0]
      .split('=')[1];
    global.testRefreshToken = res.header['set-cookie'][cookie_header_length - 1]
      .split(';')[0]
      .split('=')[1];
  } catch (e: unknown) {}
}
