// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import startTestServer from '../startTestServer';
import { testPOSTRequest } from '../helpers/testEndpoint';
import { generateUserToken } from '../helpers/setGlobals';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
import { createTicketObj } from './../data/tickets.test.data';
// Data
// Responses

describe('TICKETS', () => {
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

  describe('DEFAULT USER', () => {
    describe('BUYING', () => {
      const { valid, invalid } = createTicketObj;
      beforeAll(() => {
        generateUserToken();
      });
      it('USER should NOT be able to buy a ticket with invalid CARRIAGE id', async () => {
        await testPOSTRequest(
          '/tickets',
          invalid.carriageId.body,
          invalid.carriageId.response,
        );
      });
      it('USER should NOT be able to buy a ticket with invalid TRAIN id', async () => {
        await testPOSTRequest(
          '/tickets',
          invalid.trainId.body,
          invalid.trainId.response,
        );
      });
      it('USER should NOT be able to buy a ticket with invalid SEAT number', async () => {
        await testPOSTRequest(
          '/tickets',
          invalid.seatNumber.body,
          invalid.seatNumber.response,
        );
      });
      it('USER should NOT be able to buy a ticket with invalid CARRIAGE type', async () => {
        await testPOSTRequest(
          '/tickets',
          invalid.carriageType.body,
          invalid.carriageType.response,
        );
      });
      it('USER should NOT be able to buy a ticket with invalid STATIONS', async () => {
        await testPOSTRequest(
          '/tickets',
          invalid.stations.body,
          invalid.stations.response,
        );
      });
    });
  });
});
