import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { usersSeedData } from './data/users.seed.data';
import { stationsSeedData } from './data/stations.seed.data';
import { pricesSeedData } from './data/prices.seed.data';
import { employeesSeedData } from './data/employees.seed.data';
import {
  imagesExtension,
  imagesFolderName,
  mainImagesPath,
} from './../../config/files.config';
import { logInfo, logError } from '../../utils/logger';
import { existsSync, remove, mkdir, copyFileSync } from 'fs-extra';
import { trainsSeedData } from './data/trains.seed.data';
import { routesSeedData } from './data/routes.seed.data';
import { carriagesSeedData } from './data/carriages.seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  private loggerContext = 'Seed';

  private readonly dataToSeed = {
    user: usersSeedData,
    station: stationsSeedData,
    price: pricesSeedData,
    employee: employeesSeedData,
    route: routesSeedData,
    train: trainsSeedData,
    carriage: carriagesSeedData,
  };

  private readonly models = Reflect.ownKeys(this.prisma).filter(
    (key) => key[0] !== '_' && key !== 'prismaServiceOptions',
  );
  async removeSpecificTable(modelName: string) {
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
  private seedImagesPath = join(
    process.cwd(),
    'src',
    'prisma',
    'seed',
    'data',
    'images',
  );

  private logSeedInfo = (mess: string) => {
    logInfo(mess, this.loggerContext);
  };
  private logSeedError = (mess: string) => {
    logError(mess, this.loggerContext);
  };
  private async removeStoredImages() {
    this.logSeedInfo('Remove currently stored images');
    await remove(mainImagesPath);
    await mkdir(mainImagesPath);
    this.logSeedInfo(
      `${
        imagesFolderName.charAt(0).toLocaleUpperCase() +
        imagesFolderName.slice(1)
      } - folder has been revamped`,
    );
  }

  async seedModel(modelName: string, dataset = []) {
    await this.removeSpecificTable(modelName);

    if (dataset.length < 1) dataset = this.dataToSeed[modelName];
    if (!this.models.includes(modelName))
      this.logSeedInfo(`Unknown model name ${modelName}`);

    this.logSeedInfo(`Store ${modelName.toUpperCase()} data`);

    await Promise.all(
      dataset.map((data: any) => this.prisma[modelName].create({ data })),
    );
    if (modelName === 'employee') {
      dataset.map((data) => {
        const name = `${data.photoPath}.${imagesExtension}`;
        const savePath = join(mainImagesPath, name);
        const srcPath = join(this.seedImagesPath, name);

        if (!existsSync(savePath)) copyFileSync(srcPath, savePath);
      });
    }
    this.logSeedInfo(`${dataset.length} records have been added`);
  }

  main() {
    Promise.all([
      this.removeStoredImages(),
      this.seedModel('user'),
      this.seedModel('station'),
    ]).then(() => {
      Promise.all([this.seedModel('route'), this.seedModel('employee')]).then(
        async () => {
          await this.seedModel('train');
          await this.seedModel('carriage');
        },
      );
    });
  }
}
