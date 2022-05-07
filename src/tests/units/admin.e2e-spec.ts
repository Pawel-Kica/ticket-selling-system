import startTestServer from '../startTestServer';
import { TokenResponse } from '../helpers/responses';
import { generateTestToken } from '../helpers/setGlobals';
import { BlockedResourceError } from '../helpers/responses';
import { SeedService } from '../../prisma/seed/seed.service';
import { adminLoginData } from '../../prisma/seed/data/users.seed.data';
import { testAuthEndpoint, testPOSTRequest } from '../helpers/testEndpoint';
import { adminId, blockUserObj, unblockUserObj } from '../data/admin.test.data';
import { invalid } from 'joi';

describe('USERS CRUD', () => {
  let seedService: SeedService;

  beforeAll(async () => {
    const app = await startTestServer();
    seedService = app.get(SeedService);
    await seedService.main();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  describe('AUTHORIZATION', () => {
    it('ANONYMOUS should NOT be able to access ADMIN AUTH route', async () => {
      await testAuthEndpoint(false, 'admin');
    });
    it('ADMIN should be able to login', async () => {
      await testPOSTRequest('/users/login', adminLoginData, TokenResponse);
    });
    it('ADMIN should be able to access ADMIN AUTH route', async () => {
      await testAuthEndpoint(true, 'admin');
    });
  });
  describe('BLOCK USER', () => {
    const { valid, invalid } = blockUserObj;

    it('ADMIN should be NOT be able to block not existing user', async () => {
      await testPOSTRequest(
        `/admin/blockUser/${invalid.notFound.param}`,
        {},
        invalid.response,
      );
    });
    it('ADMIN should be able to block user', async () => {
      await testPOSTRequest(
        `/admin/blockUser/${valid.param}`,
        {},
        valid.response,
      );
    });
    it('BLOCKED USER should NOT be able to access USER AUTH endpoint', async () => {
      generateTestToken(valid.param);
      await testAuthEndpoint(false, 'users', BlockedResourceError);
    });
  });
  describe('UNBLOCK USER', () => {
    const { valid, invalid } = unblockUserObj;
    it('ADMIN should be NOT be able to unblock not existing user', async () => {
      generateTestToken(adminId);
      await testPOSTRequest(
        `/admin/unblockUser/${invalid.notFound.param}`,
        {},
        invalid.response,
      );
    });
    it('ADMIN should be able to unblock user', async () => {
      await testPOSTRequest(
        `/admin/unblockUser/${valid.param}`,
        {},
        valid.response,
      );
    });
    it('UNBLOCKED USER should be able to access USER AUTH endpoint', async () => {
      generateTestToken(valid.param);
      await testAuthEndpoint(true, 'users', BlockedResourceError);
    });
  });
});
