import { adminId, blockedUserId } from '../../../tests/data/admin.test.data';

export const adminLoginData = {
  email: 'admin@example.com',
  password: 'Admin1234!',
};

const usersSeedData = [
  {
    id: adminId,
    name: 'Admin',
    surname: 'Admin',
    role: 'admin',
    ...adminLoginData,
  },
  {
    id: blockedUserId,
    name: 'Kamil',
    surname: 'Mysliwiec',
    email: 'kamil@example.com',
    password: 'Passoword1!',
    role: 'default',
  },
];

export default usersSeedData;
