// Types
import { Role, DocumentType } from '@prisma/client';
// Tools
import faker from '@faker-js/faker';
import { generateIdPrefixes } from './helpers';
// Data
import { userPrefix } from './prefixes';
import { adminLoginBody } from '../../../tests/data/admin.test.data';
import {
  managerUserId,
  bossUserId,
  adminUserId,
  testUserId,
} from '../../../tests/data/id.test.data';

function generateUsers(n: number) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: `user${i}@example.com`,
      password: `Password1!${i}`,
      documentType: DocumentType.identityCard,
      documentNumber: `document${i}`,
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
  documentNumber: '123',
  documentType: DocumentType.identityCard,
  ...adminLoginBody,
};
export const testUser = {
  id: testUserId,
  name: 'Johnny',
  surname: 'Depp',
  email: 'johnnydeep@example.com',
  password: 'Password1!',
  documentNumber: '456',
  documentType: DocumentType.identityCard,
  role: Role.default,
};
export const managerUser = {
  id: managerUserId,
  name: 'August',
  surname: 'Comte',
  email: 'august@example.com',
  password: 'Password1!',
  documentNumber: '789',
  documentType: DocumentType.identityCard,
  role: Role.manager,
};
export const bossUser = {
  id: bossUserId,
  name: 'Satoshi',
  surname: 'Nakomoto',
  email: 'satoshi@example.com',
  password: 'Password1!',
  documentNumber: '101112',
  documentType: DocumentType.identityCard,
  role: Role.boss,
};

export const usersSeedData = [
  adminUser,
  testUser,
  managerUser,
  bossUser,
  ...generateIdPrefixes(users, userPrefix),
];
