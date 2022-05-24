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
          name: { type: 'string', example: 'Ansel' },
          surname: { type: 'string', example: 'Elgort' },
          dateOfBirth: { type: 'date', example: '26-05-2002' },
          address: {
            type: 'string',
            example: 'Champs Elysees 1',
          },
          telephoneNumber: { type: 'string', example: '123456789' },
          position: { type: 'position', example: 'driver' },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      examples: {
        valid: {
          summary: 'Valid',
          value: {
            name: '12',
          },
        },
      },
    }),
  );
}
