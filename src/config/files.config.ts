// Tools
import { join } from 'path';
// Data
import { employeePrefix } from '../prisma/seed/data/prefixes';

export const imagesFolderName = 'images';
export const imagesExtension = 'jpg';

export const publicPath = join(process.cwd(), 'public');
export const srcPath = join(process.cwd(), 'src');

export const mainPublicPath =
  process.env.NODE_ENV === 'test'
    ? join(publicPath, 'test')
    : join(publicPath, 'dev');

export const imagesPath = join(mainPublicPath, imagesFolderName);

export const defaultEmployeePhotoPath = `${employeePrefix}0`;
