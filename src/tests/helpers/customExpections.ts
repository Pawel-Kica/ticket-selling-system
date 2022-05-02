import pureOmit from '../../utils/pureOmit';
import { HttpException } from '@nestjs/common';
import { equalToRes } from '../../@types/tests';

export function expectToEqualObject(
  data: any,
  equalTo: Omit<equalToRes, 'status'>,
) {
  expect(pureOmit(data, equalTo.omit)).toEqual(equalTo.data);
}

export function expectToEqualRes({ body, status }: any, equalTo: equalToRes) {
  expectToEqualObject(body, equalTo);
  expect(equalTo.status).toEqual(status);

  equalTo.omit.forEach((property) => {
    expect(body).toHaveProperty(property);
  });
}

export function expectToEqualError({ body, status }: any, err: HttpException) {
  expect(body.message).toEqual(err.getResponse());
  expect(status).toEqual(err.getStatus());
}
