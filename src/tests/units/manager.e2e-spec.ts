import startTestServer from '../startTestServer';
import { TestingModule } from '@nestjs/testing';
import { SeedService } from '../../prisma/seed/seed.service';
import { testAuthEndpoint } from '../helpers/testEndpoint';
import { generateManagerToken } from '../helpers/setGlobals';

describe('MANAGER', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await startTestServer();
    seedService = app.get(SeedService);

    await seedService.seedModel('user');
  });
  afterAll(async () => {
    seedService.removeSpecificTable('user');
    app.close();
  });

  describe('AUTHORIZATION', () => {
    it('ANONYMOUS should not be able to access MANAGER AUTH route', async () => {
      await testAuthEndpoint(false, 'manager');
    });
    it('USER should not be able to access MANAGER AUTH route', async () => {
      await testAuthEndpoint(false, 'manager');
    });
    it('MANAGER should be able to access USER AUTH route', async () => {
      generateManagerToken();
      await testAuthEndpoint(true, 'users');
    });
    it('MANAGER should be able to access MANAGER AUTH route', async () => {
      await testAuthEndpoint(true, 'manager');
    });
  });
});
