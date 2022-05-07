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
      param: '2115',
      response: NotFoundError,
    },
  },
};

export const unblockUserObj = blockUserObj;
export const updateRolesObj = {
  ...blockUserObj,
  valid: {
    ...blockUserObj.valid,
    role: 'admin',
  },
};

export const removeUserObj = blockUserObj;
