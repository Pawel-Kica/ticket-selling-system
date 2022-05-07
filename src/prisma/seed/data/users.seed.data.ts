import {
  adminId,
  adminLoginBody,
  testUserId,
} from '../../../tests/data/admin.test.data';
import { Role } from '@prisma/client';

export const adminSeedData = {
  id: adminId,
  name: 'Admin',
  surname: 'Admin',
  role: Role.admin,
  ...adminLoginBody,
};

export const usersSeedData = [
  adminSeedData,
  {
    id: testUserId,
    name: 'Johnny',
    surname: 'Depp',
    email: 'johnnyDeep@example.com',
    password: 'Password1!',
    role: Role.default,
  },
];
