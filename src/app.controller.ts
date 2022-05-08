import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { User } from '@prisma/client';
import { Helper } from './utils/files/Helper';
import { UserObj } from './decorators/user.decorator';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { imagesExtension, mainPath } from './config/files.config';

@Controller()
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    return 'success';
  }

  @Get('image/:name')
  findImageByName(@Param('name') name: string, @Res() res: Response) {
    return res.sendFile(join(mainPath, `${name}.${imagesExtension}`));
  }
}
