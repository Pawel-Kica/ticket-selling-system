import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';
import { testAuthEndpoint, testPOSTRequest } from '../helpers/testEndpoint';
import { adminLogInObj } from '../data/admin.test.data';

describe('USERS CRUD', () => {
  let seedService: SeedService;
  beforeAll(async () => {
    seedService = await startTestServer();
    await seedService.seedModel('user');
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  describe('AUTHORIZATION', () => {
    const { body, response } = adminLogInObj;
    it('ANONYMOUS should NOT be able to access ADMIN AUTH route', async () => {
      await testAuthEndpoint(false, 'admin');
    });
    it('ADMIN should be able to login', async () => {
      await testPOSTRequest('/users/login', body, response);
    });
    it('ADMIN should be able to access ADMIN AUTH route', async () => {
      await testAuthEndpoint(true, 'admin');
    });
  });
});
