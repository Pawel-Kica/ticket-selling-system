// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import startTestServer from '../startTestServer';
import { testAuthEndpoint, testGETRequest } from '../helpers/testEndpoint';
import { generateManagerToken, generateUserToken } from '../helpers/setGlobals';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
// Data
// Responses

describe('MANAGER', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await startTestServer();
    seedService = app.get(SeedService);

    await seedService.main();
  });
  afterAll(async () => {
    await seedService.removeAllTables();
    app.close();
  });

  describe('Buing tickets brra', () => {
    it('ANONYMOUS should not be able to access MANAGER AUTH route', async () => {
      await testAuthEndpoint(false, 'manager');
    });
  });
});
