// Types
import { Request } from 'express';
// Tools
import { randomBytes } from 'crypto';
import { ensureDir } from 'fs-extra';
// Responses
import { UnsupportedMediaTypeException } from '@nestjs/common';
// Config
import { imagesExtension, imagesPath } from '../../config/files.config';

export class FileUploadHelper {
  static async customFileName(
    _req: Request,
    file: { mimetype: string | string[]; originalname: string },
    cb: (arg0: any, arg1: any) => void,
  ) {
    if (file.mimetype.indexOf(imagesExtension) != -1)
      return cb(new UnsupportedMediaTypeException(), false);

    await ensureDir(imagesPath);
    const uniqueSuffix = randomBytes(64).toString('hex');
    const fileExtension = imagesExtension;

    cb(null, uniqueSuffix + '.' + fileExtension);
  }
  static destinationPath(
    _req: Request,
    _file: any,
    cb: (arg0: any, arg1: string) => void,
  ) {
    cb(null, imagesPath);
  }
}
