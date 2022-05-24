// Nest
import { HttpStatus } from '@nestjs/common';
// Tools
import { omit, modifyObject, pick } from '../../utils/objects';
// Responses
import { InvalidRequestedBodyException } from '../../utils/responses/errors';
import {
  ConflictExceptionError,
  InvalidCredentialsError,
  requestedBodySchemaError,
  TokenResponse,
} from '../helpers/responses';
// Types
import { DocumentType } from '@prisma/client';
// Validation
import { createUserSchema } from '../../validation/schemas/user.schema';
import { usersSeedData } from '../../prisma/seed/data/users.seed.data';

const createUserBody = {
  name: 'Elon',
  surname: 'Musk',
  email: 'ElonMusk@spacex.com',
  password: 'Tesla123!',
  passwordRepetition: 'Tesla123!',
  documentType: DocumentType.identityCard,
  documentNumber: 'p100s',
};
const invalidCreateUserBody = {
  ...modifyObject(createUserBody, '!'),
  password: 'regex123',
};
const userDataResponse = {
  data: {
    ...omit(createUserBody, ['password', 'passwordRepetition']),
    //emailToLowerCase middleware
    email: createUserBody.email.toLowerCase(),
    //default properties
    role: 'default',
    blocked: false,
  },
  status: HttpStatus.CREATED,
  omit: 'id',
};

export const variable = 12;

export const createUserObj = {
  valid: {
    body: createUserBody,
    response: userDataResponse,
  },
  invalid: {
    schema: {
      body: invalidCreateUserBody,
      response: requestedBodySchemaError(
        createUserSchema,
        invalidCreateUserBody,
      ),
    },
    emailAlreadyExists: {
      body: {
        ...createUserBody,
        email: usersSeedData[0].email,
      },
      response: ConflictExceptionError,
    },
  },
};

export const loginUserBody = pick(createUserBody, ['email', 'password']);
export const invalidCredentialsLoginUserBody = {
  ...loginUserBody,
  password: 'Password1!',
};

export const loginUserObj = {
  valid: {
    body: loginUserBody,
    response: TokenResponse,
  },
  invalid: {
    credentials: {
      body: invalidCredentialsLoginUserBody,
      response: InvalidCredentialsError,
    },
  },
};
