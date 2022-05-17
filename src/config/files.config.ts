import { join } from 'path';

export const imagesFolderName = 'images';
export const imagesExtension = 'jpg';

export const publicPath = join(process.cwd(), 'public');
export const srcPath = join(process.cwd(), 'src');

export const mainPublicPath =
  process.env.NODE_ENV === 'test' ? join(publicPath, 'test') : publicPath;

export const mainImagesPath = join(mainPublicPath, imagesFolderName);
