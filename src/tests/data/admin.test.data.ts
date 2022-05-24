// Nest
import { HttpStatus } from '@nestjs/common';
// Tools
import * as moment from 'moment';
import { modifyObject, omit, pick } from '../../utils/objects';
// Data
import { testUserID } from './id.test.data';
import { adminUser } from '../../prisma/seed/data/users.seed.data';
// Config
import { defaultEmployeePhotoPath } from '../../config/files.config';
// Responses
import {
  NotFoundErrorInstance,
  requestedBodySchemaError,
  SuccessTestResponse,
} from '../helpers/responses';
// Validation
import { requestDateFormat } from '../../config/dates.config';
import { createUserObj, loginUserBody } from './users.test.data';
import { createEmployeeSchema } from '../../validation/schemas/employee.schema';
import { createUserByAdminSchema } from '../../validation/schemas/user.schema';

export const adminLoginBody = pick(adminUser, ['email', 'password']);

export const userCreatedByAdminLoginBody = loginUserBody;

export const createUserByAdminBody = {
  ...createUserObj.valid.body,
  role: 'default',
};
export const invalidCreateUserByAdminBody = {
  ...createUserObj.invalid.schema.body,
  role: 'adminn',
};

export const createUserByAdminObj = {
  valid: {
    body: createUserByAdminBody,
    response: {
      data: {
        ...omit(createUserByAdminBody, ['password', 'passwordRepetition']),
        // emailToLowerCase middleware
        email: createUserByAdminBody.email.toLowerCase(),
        // default properties
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
      response: requestedBodySchemaError(
        createUserByAdminSchema,
        invalidCreateUserByAdminBody,
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
  dateOfBirth: '01-02-1990',
  address: 'Poland',
  telephoneNumber: '123456789',
  position: 'driver',
};
const invalidCreateEmployeeBody = modifyObject(createEmployeeBody, '!');

export const createEmployeeObj = {
  valid: {
    body: createEmployeeBody,
    response: {
      data: {
        ...createEmployeeBody,
        photoPath: defaultEmployeePhotoPath,
        dateOfBirth: moment(createEmployeeBody.dateOfBirth, requestDateFormat)
          .startOf('day')
          .toISOString(),
      },
      status: HttpStatus.CREATED,
      omit: 'id',
    },
  },
  invalid: {
    schema: {
      body: invalidCreateEmployeeBody,
      response: requestedBodySchemaError(
        createEmployeeSchema,
        invalidCreateEmployeeBody,
      ),
    },
  },
};
