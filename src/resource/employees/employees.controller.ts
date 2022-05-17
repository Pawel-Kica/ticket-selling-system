import { join } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { mainImagesPath, imagesExtension } from '../../config/files.config';
import { Controller, Get, Param, Res } from '@nestjs/common';

@ApiTags('Public - Employees')
@Controller('employees')
export class EmployeesController {
  @Get('image/:photoName')
  getPhoto(@Param('photoName') photoName: string, @Res() res: Response) {
    return res.sendFile(
      join(mainImagesPath, `${photoName}.${imagesExtension}`),
    );
  }
}
