import { Request } from 'express';
import { randomBytes } from 'crypto';
import { ensureDir } from 'fs-extra';
import { imagesExtension, mainImagesPath } from '../../config/files.config';
import { UnsupportedMediaTypeException } from '@nestjs/common';

export class FileUploadHelper {
  static async customFileName(
    _req: Request,
    file: { mimetype: string | string[]; originalname: string },
    cb: (arg0: any, arg1: any) => void,
  ) {
    if (file.mimetype.indexOf(imagesExtension) != -1)
      return cb(new UnsupportedMediaTypeException(), false);

    await ensureDir(mainImagesPath);
    const uniqueSuffix = randomBytes(64).toString('hex');
    const fileExtension = imagesExtension;

    cb(null, uniqueSuffix + '.' + fileExtension);
  }
  static destinationPath(
    _req: Request,
    _file: any,
    cb: (arg0: any, arg1: string) => void,
  ) {
    cb(null, mainImagesPath);
  }
}
