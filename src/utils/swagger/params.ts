import { testUserID } from '../../tests/data/id.test.data';
import {
  carriagePrefix,
  routePrefix,
  stationPrefix,
  trainPrefix,
  userPrefix,
} from '../../prisma/seed/data/prefixes';

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

export function uniqueIdParam(
  subject: string,
  valid: string,
  notFound = '123',
) {
  return {
    name: 'id',
    description: `Specify the ID of ${subject} to be found`,
    examples: {
      valid: {
        value: valid,
      },
      notFound: {
        summary: 'not found',
        value: notFound,
      },
    },
  };
}

export const invalidRoleIdBadRequest = {
  statusCode: 400,
  message: ['role must be a valid enum value', 'id must be a string'],
  error: 'Bad Request',
};

export const endStationFilter = {
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

export const startStationFilter = {
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

export const carriageIdFilter = {
  name: 'carriageId',
  description: 'Filter by carriageId property',
  examples: {
    empty: {
      value: '',
    },
    example: {
      value: `${carriagePrefix}1`,
    },
  },
  required: false,
};

export const trainIdFilter = {
  name: 'trainId',
  description: 'Filter by trainId property',
  examples: {
    empty: {
      value: '',
    },
    example: {
      value: `${trainPrefix}1`,
    },
  },
  required: false,
};

export const routeIdFilter = {
  name: 'routeId',
  description: 'Filter by routeId property',
  examples: {
    empty: {
      value: '',
    },
    example: {
      value: `${routePrefix}1`,
    },
  },
  required: false,
};

export const userIdFilter = {
  name: 'userId',
  description: 'Filter by userId property',
  examples: {
    empty: {
      value: '',
    },
    example: {
      value: `${userPrefix}1`,
    },
  },
  required: false,
};
