// Nest
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
// Tools
import { join } from 'path';
// Types
import { Response } from 'express';
// Config
import { imagesPath, imagesExtension } from '../../config/files.config';

@ApiTags('Public - Employees')
@Controller('employees')
export class EmployeesController {
  @Get('image/:photoName')
  async getPhoto(@Param('photoName') photoName: string, @Res() res: Response) {
    return res.sendFile(join(imagesPath, `${photoName}.${imagesExtension}`));
  }
}
