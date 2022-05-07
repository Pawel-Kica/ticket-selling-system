import { NotFoundError, SuccessTestResponse } from '../helpers/responses';

export const adminId = '1';
export const blockedUserId = '2';

export const blockUserObj = {
  valid: {
    param: blockedUserId,
    response: SuccessTestResponse,
  },
  invalid: {
    notFound: {
      param: '123123',
    },
    response: NotFoundError,
  },
};
export const unblockUserObj = blockUserObj;
