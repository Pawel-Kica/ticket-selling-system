import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';
import { testAuthEndpoint, testPOSTRequest } from '../helpers/testEndpoint';
import { createUserObj } from '../data/users.test.data';
import { loginUserObj } from '../data/users.test.data';
import { removeTestToken } from '../helpers/setGlobals';

describe('USERS CRUD', () => {
  let seedService: SeedService;
  beforeAll(async () => {
    const app = await startTestServer();
    seedService = app.get(SeedService);
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
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
    it('USER should be able to create a new account with VALID body', async () => {
      await testPOSTRequest('/users', valid.body, valid.response);
    });
    it('USER should NOT be able to create a new account with an email that ALREADY EXISTS', async () => {
      await testPOSTRequest(
        '/users',
        invalid.emailAlreadyExists.body,
        invalid.emailAlreadyExists.response,
      );
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
