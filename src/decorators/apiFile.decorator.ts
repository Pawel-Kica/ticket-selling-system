// Nest
import { FileInterceptor } from '@nestjs/platform-express';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
// Swagger
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
// Tools
import { diskStorage } from 'multer';
import { FileUploadHelper } from '../utils/files/Helper';

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
