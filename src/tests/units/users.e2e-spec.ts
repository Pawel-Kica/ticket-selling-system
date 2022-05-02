import startTestServer from '../startTestServer';
import { SeedService } from '../../prisma/seed/seed.service';
import { testGETRequest } from '../helpers/testEndpoint';
import { InvalidCredentialsInstance } from '../helpers/errors';

describe('Users CRUD', () => {
  let seedService: SeedService;

  beforeAll(async () => {
    seedService = await startTestServer();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  it('/ (UwU)', async () => {
    await testGETRequest('/', {
      data: { msg: 'Welcome' },
      status: 200,
      omit: [],
    });
  });
  it('/ (UwU)', async () => {
    await testGETRequest('/err', InvalidCredentialsInstance);
  });
});
