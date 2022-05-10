import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { join } from 'path';
import { Response } from 'express';
import { mainImagesPath, imagesExtension } from '../../config/files.config';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findMany() {
    return this.employeesService.findMany();
  }
  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.employeesService.safeFindUnique({ id });
  }
  @Get('image/:photoName')
  getPhoto(@Param('photoName') photoName: string, @Res() res: Response) {
    return res.sendFile(
      join(mainImagesPath, `${photoName}.${imagesExtension}`),
    );
  }
}
