// Nest
import { HttpStatus } from '@nestjs/common';
// Tools
import { modifyObject, omit } from '../../utils/objects';
// Data
import { testUserID } from './id.test.data';
import { InvalidRequestedBody } from '../../utils/responses/errors';
// Config
import { defaultEmployeePhotoPath } from '../../config/files.config';
// Responses
import {
  NotFoundErrorInstance,
  SuccessTestResponse,
} from '../helpers/responses.dto';
// Validation
import { validateSchema } from '../../validation/validationPipe';
import { createUserByAdminSchema } from '../../validation/schemas/user.schema';
import { createEmployeeSchema } from '../../validation/schemas/employee.schema';
import {
  createUserBody,
  invalidCreateUserBody,
  loginUserBody,
} from './users.test.data';

export const adminLoginBody = {
  email: 'admin@example.com',
  password: 'Admin1234!',
};
export const createUserByAdminLoginBody = loginUserBody;

export const createUserByAdminBody = {
  ...createUserBody,
  role: 'default',
};

export const invalidCreateUserByAdminBody = {
  ...invalidCreateUserBody,
  role: 'adminn',
};

export const createUserByAdminObj = {
  valid: {
    body: createUserByAdminBody,
    response: {
      data: {
        ...omit(createUserByAdminBody, ['password', 'passwordRepetition']),
        //emailToLowerCase middleware
        email: createUserBody.email.toLowerCase(),
        //default properties
        role: 'default',
        blocked: false,
      },
      status: HttpStatus.CREATED,
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
    param: testUserID,
    response: SuccessTestResponse,
  },
  invalid: {
    notFound: {
      param: '2115',
      response: NotFoundErrorInstance,
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
const invalidCreateEmployeeBody = modifyObject(createEmployeeBody, '!');

export const createEmployeeObj = {
  valid: {
    body: createEmployeeBody,
    response: {
      data: { ...createEmployeeBody, photoPath: defaultEmployeePhotoPath },
      status: HttpStatus.CREATED,
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
