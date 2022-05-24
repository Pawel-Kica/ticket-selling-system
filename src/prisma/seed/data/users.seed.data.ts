// Types
import { Role, DocumentType } from '@prisma/client';
// Tools
import faker from '@faker-js/faker';
import { generateIdPrefixes } from './helpers';
// Data
import { userPrefix } from './prefixes';
import {
  managerUserID,
  bossUserID,
  adminUserID,
  testUserID,
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

export const adminUser = {
  id: adminUserID,
  name: 'Admin',
  surname: 'User',
  email: 'admin@example.com',
  password: 'Admin123!',
  role: Role.admin,
  documentNumber: '123',
  documentType: DocumentType.identityCard,
};
export const testUser = {
  id: testUserID,
  name: 'Default',
  surname: 'User',
  email: 'default@example.com',
  password: 'Password1!',
  documentNumber: '456',
  documentType: DocumentType.identityCard,
  role: Role.default,
};
export const managerUser = {
  id: managerUserID,
  name: 'Manager',
  surname: 'User',
  email: 'manager@example.com',
  password: 'Password1!',
  documentNumber: '789',
  documentType: DocumentType.identityCard,
  role: Role.manager,
};
export const bossUser = {
  id: bossUserID,
  name: 'Boss',
  surname: 'User',
  email: 'boss@example.com',
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
  ...generateIdPrefixes(generateUsers(numberOfUsers), userPrefix),
];
