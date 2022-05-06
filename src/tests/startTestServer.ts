import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { SeedService } from '../prisma/seed/seed.service';

async function startTestServer() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [SeedService],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();

  global.request = supertest(app.getHttpServer());

  return moduleFixture.get<SeedService>(SeedService);
}

export default startTestServer;
