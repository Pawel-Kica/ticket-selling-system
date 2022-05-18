// Nest
import { HttpStatus } from '@nestjs/common';
// Tools
import { omit, modifyObject, pick } from '../../utils/objects';
// Responses
import { InvalidRequestedBody } from '../../utils/responses/errors';
import {
  ConflictExceptionError,
  InvalidCredentialsError,
  TokenResponse,
} from '../helpers/responses';
// Validation
import { DocumentType } from '@prisma/client';
import { createUserSchema } from '../../validation/schemas/user.schema';
import { validateSchema } from '../../validation/validationPipe';

export const createUserBody = {
  name: 'Elon',
  surname: 'Musk',
  email: 'ElonMusk@spacex.com',
  password: 'Tesla123!',
  passwordRepetition: 'Tesla123!',
  documentType: DocumentType.identityCard,
  documentNumber: 'p100s',
};
export const userResponse = {
  data: {
    ...omit(createUserBody, ['password', 'passwordRepetition']),
    //emailToLowerCase middleware
    email: createUserBody.email.toLowerCase(),
    //default properties
    role: 'default',
    blocked: false,
  },
  status: HttpStatus.OK,
  omit: 'id',
};

export const invalidCreateUserBody = modifyObject(createUserBody, '!');

export const createUserObj = {
  valid: {
    body: createUserBody,
    response: userResponse,
  },
  invalid: {
    schema: {
      body: invalidCreateUserBody,
      response: new InvalidRequestedBody(
        validateSchema(createUserSchema, invalidCreateUserBody),
      ),
    },
    emailAlreadyExists: {
      // running after successful request (creating an account)
      body: createUserBody,
      response: ConflictExceptionError,
    },
  },
};

export const loginUserObj = {
  valid: {
    body: pick(createUserBody, ['email', 'password']),
    response: TokenResponse,
  },
  invalid: {
    credentials: {
      body: {
        ...pick(createUserBody, ['email']),
        password: 'Password1!',
      },
      response: InvalidCredentialsError,
    },
  },
};
