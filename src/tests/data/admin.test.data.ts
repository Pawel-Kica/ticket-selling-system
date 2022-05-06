import { adminLoginData } from '../../prisma/seed/data/users.seed.data';
import {
  NotFoundError,
  SuccessTestResponse,
  TokenResponse,
} from '../helpers/responses';

export const adminLoginObj = {
  body: adminLoginData,
  response: TokenResponse,
};

export const blockUserObj = {
  valid: {
    param: '2',
    response: SuccessTestResponse,
  },
  invalid: {
    notFound: {
      id: '3',
    },
    response: NotFoundError,
  },
};

export const unblockUserObj = {
  valid: {
    param: '2',
    response: SuccessTestResponse,
  },
};
