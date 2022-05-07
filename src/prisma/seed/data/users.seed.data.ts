import {
  adminId,
  adminLoginBody,
  testUserId,
} from '../../../tests/data/admin.test.data';

export const adminSeedData = {
  id: adminId,
  name: 'Admin',
  surname: 'Admin',
  role: 'admin',
  ...adminLoginBody,
};

const usersSeedData = [
  adminSeedData,
  {
    id: testUserId,
    name: 'Johnny',
    surname: 'Depp',
    email: 'johnnyDeep@example.com',
    password: 'Password1!',
    role: 'default',
  },
];

export default usersSeedData;
