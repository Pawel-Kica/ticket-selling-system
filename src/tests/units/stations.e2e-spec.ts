// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import startTestServer from '../startTestServer';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
// Data
import { stationsSeedData } from '../../prisma/seed/data/stations.seed.data';

describe('STATIONS', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await startTestServer();
    seedService = app.get(SeedService);
    await seedService.seedModel('station');
  });
  afterAll(async () => {
    seedService.removeSpecificTable('station');
    app.close();
  });
  describe('GET STATIONS', () => {
    it('ANONYMOUS should be able to get all stations', async () => {
      const res = await global.request.get('/stations');
      expect(res.body.length).toEqual(stationsSeedData.length);
    });
  });
});
