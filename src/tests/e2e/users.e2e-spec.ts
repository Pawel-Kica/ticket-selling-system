// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import testServer from '../testServer';
import { removeTestToken } from '../helpers/globals';
import { testAuthEndpoint, testPOSTRequest } from '../helpers/testEndpoint';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
// Data
import { createUserObj } from '../data/users.test.data';
import { loginUserObj } from '../data/users.test.data';

describe('USERS CRUD', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await testServer();
    seedService = app.get(SeedService);

    await seedService.seedModel('user');
  });
  afterAll(async () => {
    seedService.removeSpecificTable('user');
    removeTestToken();
    app.close();
  });

  describe('CREATE AN ACCOUNT', () => {
    const { valid, invalid } = createUserObj;
    it('USER should NOT be able to create a new account with INVALID body', async () => {
      await testPOSTRequest(
        '/users',
        invalid.schema.body,
        invalid.schema.response,
      );
    });
    it('USER should NOT be able to create a new account with an email that ALREADY EXISTS', async () => {
      await testPOSTRequest(
        '/users',
        invalid.emailAlreadyExists.body,
        invalid.emailAlreadyExists.response,
      );
    });
    it('USER should be able to create a new account with VALID body', async () => {
      await testPOSTRequest('/users', valid.body, valid.response);
    });
    it('USER should NOT be able to access USER AUTH endpoint after removing TEST TOKEN', async () => {
      removeTestToken();
      await testAuthEndpoint(false, 'users');
    });
  });
  describe('LOG IN', () => {
    const { valid, invalid } = loginUserObj;
    it('USER should NOT be able to access USER AUTH endpoint before logging in', async () => {
      await testAuthEndpoint(false, 'users');
    });
    it('USER should NOT be able to login with invalid credentials', async () => {
      await testPOSTRequest(
        '/users/login',
        invalid.credentials.body,
        invalid.credentials.response,
      );
    });
    it('USER should be able to login with valid credentials', async () => {
      await testPOSTRequest('/users/login', valid.body, valid.response);
    });
    it('USER should be able to access USER AUTH endpoint after logging in', async () => {
      await testAuthEndpoint(true, 'users');
    });
  });
});
