import users from './data/users.seed.data';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly models = Reflect.ownKeys(this.prisma).filter(
    (key) => key[0] !== '_' && key !== 'prismaServiceOptions',
  );

  async seedModel(modelName: string, data: any) {
    if (!this.models.includes(modelName)) return;
    return Promise.all(
      data.map((record: any) =>
        this.prisma[modelName].create({ data: record }),
      ),
    );
  }

  async removeTables() {
    return Promise.all(
      this.models.map((modelKey) => this.prisma[modelKey].deleteMany()),
    );
  }
  async removeSpecificTable(modelName: string) {
    if (!this.models.includes(modelName)) return;
    await this.prisma[modelName].deleteMany();
  }

  async main() {
    await this.removeTables();
    await this.seedModel('user', users);
  }
}
