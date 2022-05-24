// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import testServer from '../testServer';
import { testGETRequest } from '../helpers/testEndpoint';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
// Data
import { viewAllTrainsResponse } from '../data/trains.test.data';

describe('TRAINS', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await testServer();
    seedService = app.get(SeedService);

    await seedService.main();
  });
  afterAll(async () => {
    await seedService.removeAllTables();
    app.close();
  });
  it('ANONYMOUS should be able to view all trains', async () => {
    await testGETRequest('/trains', viewAllTrainsResponse);
  });
});
