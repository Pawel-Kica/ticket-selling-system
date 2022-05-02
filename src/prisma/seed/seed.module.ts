import { Module, Global } from '@nestjs/common';
import { SeedService } from './seed.service';

@Global()
@Module({
  providers: [SeedService],
})
export class SeedModule {}
