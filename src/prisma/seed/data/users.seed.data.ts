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
  {
    id: '2',
    name: 'Kamil',
    surname: 'Mysliwiec',
    email: 'kamil@example.com',
    password: 'Passoword1!',
    role: 'default',
  },
];

export default usersSeedData;
