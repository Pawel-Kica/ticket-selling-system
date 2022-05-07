import { addToObject, omit } from '../../utils/objects';
import { HttpStatus } from '@nestjs/common';
import { NotFoundError, SuccessTestResponse } from '../helpers/responses';
import { createUserByAdminSchema } from '../../validation/schemas/user.schema';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { validateSchema } from '../../validation/validationPipe';

export const adminId = '1';
export const testUserId = '2';
export const adminLoginBody = {
  email: 'admin@example.com',
  password: 'Admin1234!',
};
export const createUserByAdminLoginBody = {
  email: 'kamil@example.com',
  password: 'Passoword1!',
};
export const createUserByAdminBody = {
  name: 'Kamil',
  surname: 'Mysliwiec',
  role: 'default',
  passwordRepetition: 'Passoword1!',
  ...createUserByAdminLoginBody,
};

export const invalidCreateUserByAdminBody = addToObject(
  createUserByAdminLoginBody,
  '!',
);

export const createUserByAdminObj = {
  valid: {
    body: createUserByAdminBody,
    response: {
      data: {
        ...omit(createUserByAdminBody, ['password', 'passwordRepetition']),
        blocked: false,
      },
      status: HttpStatus.OK,
      omit: 'id',
    },
  },
  invalid: {
    schema: {
      body: invalidCreateUserByAdminBody,
      response: new InvalidRequestedBody(
        validateSchema(createUserByAdminSchema, invalidCreateUserByAdminBody),
      ),
    },
  },
};

export const blockUserObj = {
  valid: {
    param: testUserId,
    response: SuccessTestResponse,
  },
  invalid: {
    notFound: {
      param: '2115',
      response: NotFoundError,
    },
  },
};

export const unblockUserObj = blockUserObj;
export const updateRolesObj = {
  ...blockUserObj,
  valid: {
    ...blockUserObj.valid,
    role: 'admin',
  },
};

export const removeUserObj = blockUserObj;
