import faker from '@faker-js/faker';
import { Role } from '@prisma/client';
import {
  adminId,
  adminLoginBody,
  testUserId,
} from '../../../tests/data/admin.test.data';
import generateIdPrefixes from './generateData';
import { userPrefix } from './prefixes';

function generateUsers(n: number) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: `user${i}@example.com`,
      password: `Password1!${i}`,
      role: i < numberOfManagers ? Role.manager : Role.boss,
    });
  }
  return result;
}

export const numberOfUsers = 20;
export const numberOfBosses = numberOfUsers / 2;
export const numberOfManagers = numberOfUsers - numberOfBosses;

const users = generateUsers(numberOfUsers);

export const adminUser = {
  id: adminId,
  name: 'Admin',
  surname: 'Admin',
  role: Role.admin,
  ...adminLoginBody,
};
export const testUser = {
  id: testUserId,
  name: 'Johnny',
  surname: 'Depp',
  email: 'johnnydeep@example.com',
  password: 'Password1!',
  role: Role.default,
};

export const usersSeedData = [
  adminUser,
  testUser,
  ...generateIdPrefixes(users, userPrefix),
];
