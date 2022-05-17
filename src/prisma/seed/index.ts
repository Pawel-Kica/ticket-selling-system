// Nest
import { TestingModule, Test } from '@nestjs/testing';
// Modules
import { AppModule } from '../../app.module';
// Services
import { SeedService } from './seed.service';

if (require.main === module) {
  (async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [SeedService],
    }).compile();

    const seedService = moduleFixture.get(SeedService);
    await seedService.main();
  })();
}
