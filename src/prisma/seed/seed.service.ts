import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { usersSeedData } from './data/users.seed.data';
import { stationsSeedData } from './data/stations.seed.data';
import { pricesSeedData } from './data/prices.seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly dataToSeed = {
    user: usersSeedData,
    station: stationsSeedData,
    price: pricesSeedData,
  };
  private readonly models = Reflect.ownKeys(this.prisma).filter(
    (key) => key[0] !== '_' && key !== 'prismaServiceOptions',
  );
  private async removeSpecificTable(modelName: string) {
    if (!this.models.includes(modelName)) return;
    await this.prisma[modelName].deleteMany();
  }
  private async seedAllData() {
    return Promise.all(
      Object.keys(this.dataToSeed).map(async (e) => await this.seedModel(e)),
    );
  }
  async seedModel(modelName: string, dataset = []) {
    await this.removeSpecificTable(modelName);

    if (dataset.length < 1) dataset = this.dataToSeed[modelName];
    if (!this.models.includes(modelName)) return;
    return Promise.all(
      dataset.map((data: any) => this.prisma[modelName].create({ data })),
    );
  }
  // async removeAllTables() {
  //   return Promise.all(
  //     this.models.map((modelKey) => this.prisma[modelKey].deleteMany()),
  //   );
  // }

  async main() {
    // await this.seedAllData();
    await this.seedModel('user');
    await this.seedModel('station');
    await this.seedModel('price');
  }
}
