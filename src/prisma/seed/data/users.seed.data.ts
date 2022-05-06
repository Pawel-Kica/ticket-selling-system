export const adminLoginData = {
  email: 'admin@example.com',
  password: 'Admin1234!',
};

const usersSeedData = [
  {
    id: '1',
    name: 'Admin',
    surname: 'Admin',
    role: 'admin',
    ...adminLoginData,
  },
];

export default usersSeedData;
