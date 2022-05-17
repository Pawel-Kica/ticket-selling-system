import generateIdPrefixes from './generateData';
import faker from '@faker-js/faker';
import { Role } from '@prisma/client';
import { adminLoginBody } from '../../../tests/data/admin.test.data';
import {
  managerUserId,
  bossUserId,
  adminUserId,
  testUserId,
} from '../../../tests/data/ids';
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
  id: adminUserId,
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
export const managerUser = {
  id: managerUserId,
  name: 'August',
  surname: 'Comte',
  email: 'august@example.com',
  password: 'Password1!',
  role: Role.manager,
};
export const bossUser = {
  id: bossUserId,
  name: 'Satoshi',
  surname: 'Nakomoto',
  email: 'satoshi@example.com',
  password: 'Password1!',
  role: Role.boss,
};

export const usersSeedData = [
  adminUser,
  testUser,
  managerUser,
  bossUser,
  ...generateIdPrefixes(users, userPrefix),
];
