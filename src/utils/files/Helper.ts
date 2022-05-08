import { Request } from 'express';
import { randomBytes } from 'crypto';
import { imagesExtension, mainDir } from '../../config/files.config';

export class Helper {
  static customFileName(
    req: Request,
    file: { mimetype: string | string[]; originalname: string },
    cb: (arg0: any, arg1: string) => void,
  ) {
    const uniqueSuffix = randomBytes(64).toString('hex');
    const fileExtension = imagesExtension;

    const originalName = file.originalname.split('.')[0];
    cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }
  static destinationPath(
    _req: Request,
    _file: any,
    cb: (arg0: any, arg1: string) => void,
  ) {
    cb(null, `./${mainDir}`);
  }
}
