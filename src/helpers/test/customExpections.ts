import { HttpException } from '@nestjs/common';
import pureOmit from '../pureOmit';

export function expectToEqualObject(
  body: any,
  expectedData: object,
  propertiesToOmit: string[],
) {
  expect(pureOmit(body, propertiesToOmit)).toEqual(expectedData);

  propertiesToOmit.forEach((property) => {
    expect(body).toHaveProperty(property);
  });
}

export function expectToEqualError(data: any, err: HttpException) {
  expect(data).toEqual(err);
}
