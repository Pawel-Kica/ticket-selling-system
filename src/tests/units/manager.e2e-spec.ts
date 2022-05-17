import startTestServer from '../startTestServer';
import { TestingModule } from '@nestjs/testing';
import { SeedService } from '../../prisma/seed/seed.service';
import { testAuthEndpoint, testGETRequest } from '../helpers/testEndpoint';
import { generateManagerToken, generateUserToken } from '../helpers/setGlobals';
import { ForbiddenError } from '../helpers/responses';
import { employeesSeedData } from '../../prisma/seed/data/employees.seed.data';
import { getAllEmployeesObj } from './../data/manager.test.data';

describe('MANAGER', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await startTestServer();
    seedService = app.get(SeedService);

    await seedService.seedModel('user');
    await seedService.seedModel('station');
    await seedService.seedModel('route');
    await seedService.seedModel('employee');
  });
  afterAll(async () => {
    seedService.removeSpecificTable('user');
    seedService.removeSpecificTable('station');

    app.close();
  });

  describe('AUTHORIZATION', () => {
    it('ANONYMOUS should not be able to access MANAGER AUTH route', async () => {
      await testAuthEndpoint(false, 'manager');
    });
    it('USER should not be able to access MANAGER AUTH route', async () => {
      generateUserToken();
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
  describe('EMPLOYEES', () => {
    it('ANONYMOUS should NOT be able to access `employees data', async () => {
      generateUserToken();
      await testGETRequest('/manager/employees', ForbiddenError);
    });

    it('MANAGER should be able to access employees data', async () => {
      generateManagerToken();
      await testGETRequest('/manager/employees', getAllEmployeesObj);
    });
  });
});
