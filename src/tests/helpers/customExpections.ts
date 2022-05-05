import { equalToError, equalToRes } from '../../@types/tests/exceptions.types';
import { omit } from '../../utils/objects';

export function expectToEqualObject(
  data: any,
  equalTo: Omit<equalToRes, 'status'>,
) {
  expect(omit(data, equalTo.omit)).toEqual(equalTo.data);
}

export function expectToEqualRes({ body, status }: any, equalTo: equalToRes) {
  expectToEqualObject(body, equalTo);
  expect(equalTo.status).toEqual(status);

  equalTo.omit.forEach((property) => {
    expect(body).toHaveProperty(property);
  });
}

export function expectToEqualError({ body, status }: any, err: equalToError) {
  expect(body).toEqual(err.getResponse());
  expect(status).toEqual(err.getStatus());
}
