import { HttpException } from '@nestjs/common';
import { equalToRes } from '../../@types/tests';
import pureOmit from '../../utils/pureOmit';

export function expectToEqualObject(
  { body, status }: any,
  equalTo: equalToRes,
) {
  expect(pureOmit(body, equalTo.omit)).toEqual(equalTo.data);
  expect(equalTo.status).toEqual(status);

  equalTo.omit.forEach((property) => {
    expect(body).toHaveProperty(property);
  });
}

export function expectToEqualError({ body, status }: any, err: HttpException) {
  expect(body.message).toEqual(err.getResponse());
  expect(status).toEqual(err.getStatus());
}
