import { HttpStatus } from '@nestjs/common';
import { addToObject, omit } from '../../utils/objects';
import { NotFoundError, SuccessTestResponse } from '../helpers/responses';
import { createUserByAdminSchema } from '../../validation/schemas/user.schema';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { validateSchema } from '../../validation/validationPipe';
import { createEmployeeSchema } from '../../validation/schemas/employee.schema';
import { defaultEmployeePhotoPath } from '../../prisma/seed/data/employees.seed.data';

export const adminId = 'admin1';
export const testUserId = 'test1';
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

const createEmployeeBody = {
  name: 'TheBest',
  surname: 'Employee',
  dateOfBirth: new Date('1990-01-01').toISOString(),
  address: 'Poland',
  telephoneNumber: '123456789',
  position: 'driver',
};
const invalidCreateEmployeeBody = addToObject(createEmployeeBody, '!');

export const createEmployeeObj = {
  valid: {
    body: createEmployeeBody,
    response: {
      data: { ...createEmployeeBody, photoPath: defaultEmployeePhotoPath },
      status: 200,
      omit: 'id',
    },
  },
  invalid: {
    schema: {
      body: invalidCreateEmployeeBody,
      response: new InvalidRequestedBody(
        validateSchema(createEmployeeSchema, invalidCreateEmployeeBody),
      ),
    },
  },
};
