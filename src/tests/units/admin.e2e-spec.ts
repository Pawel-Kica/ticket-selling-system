import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';
import { testAuthEndpoint, testPOSTRequest } from '../helpers/testEndpoint';
import { JwtService } from '../../utils/jwt/jwt.service';
import { adminLoginObj, blockUserObj } from '../data/admin.test.data';
import { BlockedResourceError } from '../helpers/responses';
import { setTestToken } from '../helpers/setGlobals';

describe('USERS CRUD', () => {
  let seedService: SeedService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const app = await startTestServer();
    seedService = app.get(SeedService);
    jwtService = app.get(JwtService);
    await seedService.main();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  describe('AUTHORIZATION', () => {
    const { body, response } = adminLoginObj;
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
  describe('BLOCK USER', () => {
    const { valid, invalid } = blockUserObj;
    it('ADMIN should be able to block user', async () => {
      await testPOSTRequest(
        `/admin/blockUser/${valid.param}`,
        {},
        valid.response,
      );
    });
    it('BLOCKED USER should NOT be able to access USER AUTH endpoint', async () => {
      setTestToken(jwtService.signJWT({ id: valid.param }));
      await testAuthEndpoint(false, 'users', BlockedResourceError);
    });
  });
});
