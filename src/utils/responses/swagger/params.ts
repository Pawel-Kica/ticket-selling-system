import { testUserID } from '../../../tests/data/id.test.data';

export function userIDParam(action: string) {
  return {
    type: String,
    name: 'id',
    description: `Specify the ID of user to be ${action}`,
    examples: {
      valid: {
        value: testUserID,
      },
      notFound: {
        summary: 'not found',
        value: '123',
      },
    },
  };
}

export const invalidRoleIdBadRequest = {
  statusCode: 400,
  message: ['role must be a valid enum value', 'id must be a string'],
  error: 'Bad Request',
};
