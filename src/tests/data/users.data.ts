import { InvalidRequestedBody } from '../../utils/errors';
import { addToObject, omit } from '../../utils/objects';
import { createUserSchema } from '../../validation/schemas/user.schema';
import { validateSchema } from '../../validation/validationPipe';

export const createUserData = {
  name: 'Elon',
  surname: 'Musk',
  email: 'ElonMusk@spacex.com',
  password: 'Tesla123!',
  passwordRepetition: 'Tesla123!',
};
export const userResponseData = {
  ...omit(createUserData, ['password', 'passwordRepetition']),
  //emailToLowerCase middleware
  email: createUserData.email.toLowerCase(),
  //default user role
  role: 'default',
};

export const invalidCreateUserBody = addToObject(createUserData, '!');

export const createUserObj = {
  valid: {
    body: createUserData,
    response: {
      data: userResponseData,
      status: 201,
      omit: 'id',
    },
  },
  invalid: {
    schema: {
      body: invalidCreateUserBody,
      response: new InvalidRequestedBody(
        validateSchema(createUserSchema, invalidCreateUserBody),
      ),
    },
  },
};
