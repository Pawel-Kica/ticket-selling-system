import { NotFoundError, SuccessTestResponse } from '../helpers/responses';

export const adminId = '1';
export const testUserId = '2';

export const blockUserObj = {
  valid: {
    param: testUserId,
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
