// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import testServer from '../testServer';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
// Data
import { defaultStationsTakeNumber } from '../../resource/stations/stations.service';

describe('STATIONS', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await testServer();
    seedService = app.get(SeedService);
    await seedService.seedModel('station');
  });
  afterAll(async () => {
    seedService.removeSpecificTable('station');
    app.close();
  });
  it('ANONYMOUS should be able to view all stations', async () => {
    const res = await global.request.get('/stations');
    expect(res.body.length).toEqual(defaultStationsTakeNumber);
  });
});
