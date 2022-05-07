import { adminId, testUserId } from '../../../tests/data/admin.test.data';

export const adminLoginData = {
  email: 'admin@example.com',
  password: 'Admin1234!',
};
export const adminSeedData = [
  {
    id: adminId,
    name: 'Admin',
    surname: 'Admin',
    role: 'admin',
    ...adminLoginData,
  },
];

const usersSeedData = [
  ...adminSeedData,
  {
    id: testUserId,
    name: 'Kamil',
    surname: 'Mysliwiec',
    email: 'kamil@example.com',
    password: 'Passoword1!',
    role: 'default',
  },
];

export default usersSeedData;
