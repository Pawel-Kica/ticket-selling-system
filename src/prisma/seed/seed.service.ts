// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Tools
import { join } from 'path';
import { logInfo, logError } from '../../utils/logger';
import { existsSync, remove, copyFileSync, ensureDir } from 'fs-extra';
// Config
import {
  imagesExtension,
  imagesFolderName,
  imagesPath,
  srcPath,
} from './../../config/files.config';
// Data
import { usersSeedData } from './data/users.seed.data';
import { trainsSeedData } from './data/trains.seed.data';
import { routesSeedData } from './data/routes.seed.data';
import { pricesSeedData } from './data/prices.seed.data';
import { stationsSeedData } from './data/stations.seed.data';
import { employeesSeedData } from './data/employees.seed.data';
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
  async removeAllTables() {
    await this.removeSpecificTable('user');
    await this.removeSpecificTable('station');
    await this.removeSpecificTable('employee');

    // On Cascade
    // await this.removeSpecificTable('route');
    // await this.removeSpecificTable('train');
    // await this.removeSpecificTable('carriage');
    // await this.removeSpecificTable('price');
  }

  private async removeStoredImages() {
    this.logSeedInfo('Remove currently stored images');

    if (existsSync(imagesPath)) await remove(imagesPath);
    await ensureDir(imagesPath);

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
        const savePath = join(imagesPath, name);
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
