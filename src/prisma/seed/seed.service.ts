import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private readonly node_env = this.config.get('NODE_ENV');
  private readonly models = Reflect.ownKeys(this.prisma).filter(
    (key) => key[0] !== '_' && key !== 'prismaServiceOptions',
  );

  async removeTables() {
    if (['development', 'test'].includes(this.node_env)) {
      return Promise.all(
        this.models.map((modelKey) => this.prisma[modelKey].deleteMany()),
      );
    }
  }
  async main() {
    await this.removeTables();
  }
}
