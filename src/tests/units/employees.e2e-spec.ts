import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';

describe('Users CRUD', () => {
  let seedService: SeedService;

  beforeAll(async () => {
    seedService = await startTestServer();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  it('/ (home)', async () => {
    expect(true).toBeTruthy();
  });
});
