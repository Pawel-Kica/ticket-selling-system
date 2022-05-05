import { InvalidRequestedBody } from '../../utils/errors';
import { addToObject, omit } from '../../utils/objects';
import { BetterJoiError } from '../../validation/helpers/betterJoiError';
import { createUserSchema } from '../../validation/schemas/user.schema';
import { validateSchema } from '../../validation/validationPipe';

export const userData = {
  name: 'Elon',
  surname: 'Musk',
  email: 'ElonMusk@spacex.com',
  password: 'Tesla123!',
};
export const invalidCreateUserBody = addToObject(userData, '!');

export const createUserData = {
  valid: {
    body: {
      data: {
        userData,
        passwordRepetition: userData.password,
      },
      status: 201,
      omit: 'id',
    },
    response: omit(userData, 'password'),
  },
  invalid: {
    schema: {
      body: invalidCreateUserBody,
      response: new InvalidRequestedBody(
        validateSchema(
          createUserSchema,
          invalidCreateUserBody,
        ) as BetterJoiError[],
      ),
    },
  },
};
