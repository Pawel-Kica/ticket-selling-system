import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';
import { testPOSTRequest } from '../helpers/testEndpoint';
import { createUserData } from '../data/users.data';

describe('USERS CRUD', () => {
  let seedService: SeedService;
  beforeAll(async () => {
    seedService = await startTestServer();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  describe('CREATING AN ACCOUNT', () => {
    const { valid, invalid } = createUserData;
    it('User should NOT be able to create a new account with INVALID body', async () => {
      await testPOSTRequest(
        '/users',
        invalid.schema.body,
        invalid.schema.response,
      );
    });
  });
});
