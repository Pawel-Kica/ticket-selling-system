import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { User } from '@prisma/client';
import { UserObj } from './decorators/user.decorator';
import { ApiFile } from './decorators/apiFile.decorator';
import { imagesExtension, mainImagesPath } from './config/files.config';

@Controller()
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
  @Post()
  @ApiFile()
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get('image/:name')
  findImageByName(@Param('name') name: string, @Res() res: Response) {
    return res.sendFile(join(mainImagesPath, `${name}.${imagesExtension}`));
  }
}
