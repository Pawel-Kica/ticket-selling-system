import { join } from 'path';

export const mainDir = join('public');

export const mainPath =
  process.env.NODE_ENV === 'test'
    ? join(process.cwd(), `${mainDir}`, 'test')
    : join(process.cwd(), `${mainDir}`);

export const imagesFolderName = 'images';

export const mainImagesPath = join(mainPath, imagesFolderName);

export const imagesExtension = 'jpg';
