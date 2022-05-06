import { SeedService } from './seed.service';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';

if (require.main === module) {
  (async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [SeedService],
    }).compile();

    const seedService = moduleFixture.get(SeedService);
    seedService.main();
  })();
}
