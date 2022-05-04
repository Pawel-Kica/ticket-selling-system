import { SeedService } from '../../prisma/seed/seed.service';
import { InvalidCredentialsInstance } from '../helpers/errors';
import { testGETRequest } from '../helpers/testEndpoint';
import startTestServer from '../startTestServer';

describe('AppController (e2e)', () => {
  let seedService: SeedService;

  beforeAll(async () => {
    seedService = await startTestServer();
  });
  afterAll(async () => {
    await seedService.removeSpecificTable('user');
  });
  it('/ (home)', async () => {
    await testGETRequest('/', {
      data: { msg: 'Welcome' },
      status: 200,
      omit: [],
    });
  });
  it('/err (err)', async () => {
    await testGETRequest('/err', InvalidCredentialsInstance);
  });
});
