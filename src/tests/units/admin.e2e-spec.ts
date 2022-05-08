import startTestServer from '../startTestServer';
import { TokenResponse } from '../helpers/responses';
import { generateTestToken, generateAdminToken } from '../helpers/setGlobals';
import { BlockedResourceError } from '../helpers/responses';
import { SeedService } from '../../prisma/seed/seed.service';
import {
  testAuthEndpoint,
  testDELETERequest,
  testPATCHRequest,
  testPOSTRequest,
} from '../helpers/testEndpoint';
import {
  adminLoginBody,
  blockUserObj,
  createUserByAdminObj,
  removeUserObj,
  unblockUserObj,
  updateRolesObj,
} from '../data/admin.test.data';
import { TestingModule } from '@nestjs/testing';

describe('USERS CRUD', () => {
  let seedService: SeedService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await startTestServer();
    seedService = app.get(SeedService);

    await seedService.main();
  });
  afterAll(async () => {
    app.close();
  });

  describe('AUTHORIZATION', () => {
    it('ANONYMOUS should not be able to access admin auth route', async () => {
      await testAuthEndpoint(false, 'admin');
    });
    it('ADMIN should be able to login', async () => {
      await testPOSTRequest('/users/login', adminLoginBody, TokenResponse);
    });
    it('ADMIN should be able to access ADMIN AUTH route after logging in', async () => {
      await testAuthEndpoint(true, 'admin');
    });
  });
  describe('CREATE USER', () => {
    const { valid, invalid } = createUserByAdminObj;
    it('ADMIN should NOT be able to create a user with invalid body', async () => {
      await testPOSTRequest(
        '/admin/users',
        invalid.schema.body,
        invalid.schema.response,
      );
    });
    it('ADMIN should be able to create a user', async () => {
      await testPOSTRequest('/admin/users', valid.body, valid.response);
    });
  });
  describe('BLOCK USER', () => {
    const { valid, invalid } = blockUserObj;

    it('ADMIN should be NOT be able to block not existing users', async () => {
      await testPATCHRequest(
        `/admin/blockUser/${invalid.notFound.param}`,
        {},
        invalid.notFound.response,
      );
    });
    it('ADMIN should be able to block users', async () => {
      await testPATCHRequest(
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
    it('ADMIN should be NOT be able to unblock not existing users', async () => {
      generateAdminToken();
      await testPATCHRequest(
        `/admin/unblockUser/${invalid.notFound.param}`,
        {},
        invalid.notFound.response,
      );
    });
    it('ADMIN should be able to unblock users', async () => {
      await testPATCHRequest(
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
  describe('SET ROLES', () => {
    const { valid, invalid } = updateRolesObj;
    it('ADMIN should NOT be able to update non existings users roles', async () => {
      generateAdminToken();
      await testPATCHRequest(
        `/admin/userRole/${invalid.notFound.param}/inv`,
        {},
        invalid.notFound.response,
      );
    });
    it('ADMIN should be able to update users roles', async () => {
      await testPATCHRequest(
        `/admin/userRole/${valid.param}/${valid.role}`,
        {},
        valid.response,
      );
    });
    it(`UPDATED USER should be able to access ${valid.role} AUTH endpoint`, async () => {
      generateTestToken(valid.param);
      await testAuthEndpoint(true, valid.role);
    });
  });
  describe('REMOVE USER', () => {
    const { valid, invalid } = removeUserObj;
    it('ADMIN should NOT be able to remove non existings users', async () => {
      generateAdminToken();
      await testDELETERequest(
        `/admin/users/${invalid.notFound.param}`,
        {},
        invalid.notFound.response,
      );
    });
    it('ADMIN should be able to remove users', async () => {
      await testDELETERequest(
        `/admin/users/${valid.param}`,
        {},
        valid.response,
      );
    });
    it(`REMOVED USER should NOT be able to access USER AUTH endpoint`, async () => {
      generateTestToken(valid.param);
      await testAuthEndpoint(false, 'users');
    });
  });
});
