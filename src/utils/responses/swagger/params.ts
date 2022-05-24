import { stationPrefix } from '../../../prisma/seed/data/prefixes';
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
export function takeParam(
  subject: string,
  defaultValue: number,
  example: number,
) {
  return {
    name: 'take',
    description: `Specify the number of ${subject} you want to receive`,
    examples: {
      empty: {
        value: '',
      },
      default: {
        value: defaultValue,
      },
      example: {
        value: example,
      },
    },
    required: false,
  };
}

export const invalidRoleIdBadRequest = {
  statusCode: 400,
  message: ['role must be a valid enum value', 'id must be a string'],
  error: 'Bad Request',
};

export const endStationIdParam = {
  name: 'endStationId',
  description: 'Filter by endStationId property',
  examples: {
    empty: {
      value: '',
    },
    seed: {
      value: `${stationPrefix}3`,
    },
  },
  required: false,
};

export const startStationIdParam = {
  name: 'startStationId',
  description: 'Filter by startStationId property',
  examples: {
    empty: {
      value: '',
    },
    seed: {
      value: `${stationPrefix}1`,
    },
  },
  required: false,
};
