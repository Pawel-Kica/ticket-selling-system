import { Test } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, SeedService],
    }).compile();

    service = moduleRef.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
