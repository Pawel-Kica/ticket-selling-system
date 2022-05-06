import { HttpStatus } from '@nestjs/common';
import { pick } from './../../utils/objects';
import { InvalidRequestedBody } from '../../utils/errors';
import { addToObject, omit } from '../../utils/objects';
import { createUserSchema } from '../../validation/schemas/user.schema';
import { validateSchema } from '../../validation/validationPipe';
import {
  ConflictExceptionError,
  InvalidCredentialsError,
} from '../helpers/errors';

export const createUserData = {
  name: 'Elon',
  surname: 'Musk',
  email: 'ElonMusk@spacex.com',
  password: 'Tesla123!',
  passwordRepetition: 'Tesla123!',
};
export const userResponse = {
  data: {
    ...omit(createUserData, ['password', 'passwordRepetition']),
    //emailToLowerCase middleware
    email: createUserData.email.toLowerCase(),
    //default user role
    role: 'default',
  },
  status: HttpStatus.OK,
  omit: 'id',
};

export const invalidCreateUserBody = addToObject(createUserData, '!');

export const createUserObj = {
  valid: {
    body: createUserData,
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
      body: createUserData,
      response: ConflictExceptionError,
    },
  },
};

export const logInUserObj = {
  valid: {
    body: pick(createUserData, ['email', 'password']),
    response: userResponse,
  },
  invalid: {
    credentials: {
      body: {
        ...pick(createUserData, ['email']),
        password: 'Password1!',
      },
      response: InvalidCredentialsError,
    },
  },
};
