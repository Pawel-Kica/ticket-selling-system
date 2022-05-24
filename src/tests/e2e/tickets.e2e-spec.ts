// Nest
import { TestingModule } from '@nestjs/testing';
// Tools
import testServer from '../testServer';
import { testPOSTRequest } from '../helpers/testEndpoint';
import { generateUserToken, removeTestToken } from '../helpers/globals';
// Services
import { SeedService } from '../../prisma/seed/seed.service';
import { createTicketObj } from './../data/tickets.test.data';
import { ConflictExceptionError } from '../helpers/responses';

describe('TICKETS', () => {
  let app: TestingModule;
  let seedService: SeedService;
  beforeAll(async () => {
    app = await testServer();
    seedService = app.get(SeedService);

    await seedService.main();
  });
  afterAll(async () => {
    await seedService.removeAllTables();
    removeTestToken();
    app.close();
  });

  describe('CREATE TICKET', () => {
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
    it('USER should be able to buy a ticket with valid data (station start - station end)', async () => {
      await testPOSTRequest(
        '/tickets',
        valid.startEnd.body,
        valid.startEnd.response,
      );
    });
    it('USER should be able to buy a ticket with valid data (station start - station between)', async () => {
      await testPOSTRequest(
        '/tickets',
        valid.startBetween.body,
        valid.startBetween.response,
      );
    });
    it('USER should be able to buy a ticket with valid data (between stations)', async () => {
      await testPOSTRequest(
        '/tickets',
        valid.between.body,
        valid.between.response,
      );
    });
    it('USER should be able to buy a ticket with valid data (between station - station end)', async () => {
      await testPOSTRequest(
        '/tickets',
        valid.betweenEnd.body,
        valid.betweenEnd.response,
      );
    });
    it('USER should NOT be able to buy already bought ticket', async () => {
      await testPOSTRequest(
        '/tickets',
        valid.betweenEnd.body,
        ConflictExceptionError,
      );
    });
  });
});
