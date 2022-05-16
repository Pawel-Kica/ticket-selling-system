import { join } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RequireManager } from '../../guards/roles.';
import { EmployeesService } from './employees.service';
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { mainImagesPath, imagesExtension } from '../../config/files.config';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('image/:photoName')
  getPhoto(@Param('photoName') photoName: string, @Res() res: Response) {
    return res.sendFile(
      join(mainImagesPath, `${photoName}.${imagesExtension}`),
    );
  }

  @Get()
  @UseGuards(RequireManager)
  findMany() {
    return this.employeesService.findMany();
  }

  @Get(':id')
  @UseGuards(RequireManager)
  findUnique(@Param('id') id: string) {
    return this.employeesService.safeFindUnique({ id });
  }
}
