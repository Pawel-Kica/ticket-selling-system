import { adminLoginData } from '../../prisma/seed/data/users.seed.data';
import { tokenResponse } from '../helpers/responses';

export const adminLogInObj = {
  body: adminLoginData,
  response: tokenResponse,
};
