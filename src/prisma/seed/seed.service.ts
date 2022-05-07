import usersSeedData from './data/users.seed.data';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import stationsSeedData from './data/stations.seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly dataToSeed = {
    user: usersSeedData,
    station: stationsSeedData,
  };
  private readonly models = Reflect.ownKeys(this.prisma).filter(
    (key) => key[0] !== '_' && key !== 'prismaServiceOptions',
  );
  private async removeSpecificTable(modelName: string) {
    if (!this.models.includes(modelName)) return;
    await this.prisma[modelName].deleteMany();
  }

  async seedModel(modelName: string, dataset = []) {
    await this.removeSpecificTable(modelName);
    if (dataset.length < 1) dataset = this.dataToSeed[modelName];
    if (!this.models.includes(modelName)) return;
    return Promise.all(
      dataset.map((data: any) => this.prisma[modelName].create({ data })),
    );
  }
  async removeAllTables() {
    return Promise.all(
      this.models.map((modelKey) => this.prisma[modelKey].deleteMany()),
    );
  }

  async main() {
    await this.seedModel('user');
    await this.seedModel('station');
  }
}
