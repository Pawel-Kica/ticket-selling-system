import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';
import { testAuthEndpoint, testPOSTRequest } from '../helpers/testEndpoint';
import { createUserObj } from '../data/users.data';
import { logInUserObj } from './../data/users.data';
import { removeTestToken } from '../helpers/setGlobals';

describe('USERS CRUD', () => {
  let seedService: SeedService;
  beforeAll(async () => {
    seedService = await startTestServer();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  describe('CREATE AN ACCOUNT', () => {
    const { valid, invalid } = createUserObj;
    it('User should NOT be able to create a new account with INVALID body', async () => {
      await testPOSTRequest(
        '/users',
        invalid.schema.body,
        invalid.schema.response,
      );
    });
    it('User should be able to create a new account with VALID body', async () => {
      await testPOSTRequest('/users', valid.body, valid.response);
    });
    it('User should NOT be able to create a new account with an email that ALREADY EXISTS', async () => {
      await testPOSTRequest(
        '/users',
        invalid.emailAlreadyExists.body,
        invalid.emailAlreadyExists.response,
      );
    });
    it('User should NOT be able to access AUTH endpoint after removing TEST TOKEN', async () => {
      removeTestToken();
      await testAuthEndpoint(false);
    });
  });
  describe('LOG IN', () => {
    const { valid, invalid } = logInUserObj;
    it('User should NOT be able to access AUTH endpoint before logging in', async () => {
      await testAuthEndpoint(false);
    });
    it('User should NOT be able to login with invalid credentials', async () => {
      await testPOSTRequest(
        '/users/login',
        invalid.credentials.body,
        invalid.credentials.response,
      );
    });
    it('User should be able to login with valid credentials', async () => {
      await testPOSTRequest('/users/login', valid.body, valid.response);
    });
    it('User should be able to access AUTH endpoint after logging in', async () => {
      await testAuthEndpoint(true);
    });
  });
});
