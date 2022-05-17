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
  srcPath,
} from './../../config/files.config';
import { logInfo, logError } from '../../utils/logger';
import { existsSync, remove, mkdir, copyFileSync, ensureDir } from 'fs-extra';
import { trainsSeedData } from './data/trains.seed.data';
import { routesSeedData } from './data/routes.seed.data';
import { carriagesSeedData } from './data/carriages.seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  private loggerContext = 'Seed';
  private seedImagesPath = join(srcPath, 'prisma', 'seed', 'data', 'images');
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

  private logSeedInfo = (mess: string) => {
    logInfo(mess, this.loggerContext);
  };
  private logSeedError = (mess: string) => {
    logError(mess, this.loggerContext);
  };

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
  private async removeStoredImages() {
    this.logSeedInfo('Remove currently stored images');

    if (existsSync(mainImagesPath)) await remove(mainImagesPath);
    await ensureDir(mainImagesPath);

    this.logSeedInfo(
      `${
        imagesFolderName.charAt(0).toLocaleUpperCase() +
        imagesFolderName.slice(1)
      } - folder has been revamped`,
    );
  }

  async removeSpecificTable(modelName: string) {
    if (!this.models.includes(modelName)) return;
    await this.prisma[modelName].deleteMany();
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
      await this.removeStoredImages();
      dataset.map((data) => {
        const name = `${data.photoPath}.${imagesExtension}`;
        const savePath = join(mainImagesPath, name);
        const srcPath = join(this.seedImagesPath, name);

        if (!existsSync(savePath)) copyFileSync(srcPath, savePath);
      });
    }
    this.logSeedInfo(`${dataset.length} records have been added`);
  }

  async main() {
    await this.seedModel('user');
    await this.seedModel('station');
    await this.seedModel('route');
    await this.seedModel('employee');
    await this.seedModel('train');
    await this.seedModel('carriage');
    await this.seedModel('price');
  }
}
