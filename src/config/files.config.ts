import { join } from 'path';

export const mainDir = join('public');

export const mainPath = join(process.cwd(), `${mainDir}`);

export const mainImagesPath = join(mainPath, 'images');

export const imagesExtension = 'jpg';
