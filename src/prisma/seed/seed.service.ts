import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { usersSeedData } from './data/users.seed.data';
import { stationsSeedData } from './data/stations.seed.data';
import { pricesSeedData } from './data/prices.seed.data';
import { employeesSeedData } from './data/employees.seed.data';
import { logInfo } from '../../utils/logger';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  private loggerContext = 'Seed';

  private readonly dataToSeed = {
    user: usersSeedData,
    station: stationsSeedData,
    price: pricesSeedData,
    employee: employeesSeedData,
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
  private async removeAllTables() {
    return Promise.all(
      this.models.map((modelKey) => this.prisma[modelKey].deleteMany()),
    );
  }

  private logSeedInfo = (mess: string) => {
    logInfo(mess, this.loggerContext);
  };

  async seedModel(modelName: string, dataset = []) {
    await this.removeSpecificTable(modelName);

    if (dataset.length < 1) dataset = this.dataToSeed[modelName];
    if (!this.models.includes(modelName)) return;

    this.logSeedInfo(`Store ${modelName.toUpperCase()} data`);
    Promise.all(
      dataset.map((data: any) => this.prisma[modelName].create({ data })),
    );
    this.logSeedInfo(`${dataset.length} records have been added`);
  }

  async main() {
    await this.seedModel('user');
    await this.seedModel('station');
    await this.seedModel('price');
    await this.seedModel('employee');
  }
}
