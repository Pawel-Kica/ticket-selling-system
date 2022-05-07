import { HttpStatus } from '@nestjs/common';
import { pick } from '../../utils/objects';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { addToObject, omit } from '../../utils/objects';
import { createUserSchema } from '../../validation/schemas/user.schema';
import { validateSchema } from '../../validation/validationPipe';
import {
  ConflictExceptionError,
  InvalidCredentialsError,
  TokenResponse,
} from '../helpers/responses';

export const createUserBody = {
  name: 'Elon',
  surname: 'Musk',
  email: 'ElonMusk@spacex.com',
  password: 'Tesla123!',
  passwordRepetition: 'Tesla123!',
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

export const invalidCreateUserBody = addToObject(createUserBody, '!');

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
      // triggered after successful request(creating an account)
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
