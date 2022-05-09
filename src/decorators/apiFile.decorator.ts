import { diskStorage } from 'multer';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileUploadHelper } from '../utils/files/Helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { applyDecorators, UseInterceptors } from '@nestjs/common';

export function ApiFile() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: FileUploadHelper.destinationPath,
          filename: FileUploadHelper.customFileName,
        }),
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
          data: {
            type: 'object',
          },
        },
      },
    }),
  );
}
