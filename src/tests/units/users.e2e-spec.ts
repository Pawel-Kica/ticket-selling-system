import startTestServer from '../startTestServer';
import { testWelcome } from '../helpers/endpointTest';

describe('Users CRUD', () => {
  beforeAll(async () => {
    await startTestServer();
  });
  it('/ (UwU)', async () => {
    await testWelcome();
  });
});
