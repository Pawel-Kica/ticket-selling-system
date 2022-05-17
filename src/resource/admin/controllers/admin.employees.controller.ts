// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
// Decorators
import { ApiFile } from '../../../decorators/apiFile.decorator';
// Services
import { EmployeesService } from '../../employees/employees.service';
// Validation
import { ApplyValidation } from '../../../validation/validationPipe';
import { createEmployeeSchema } from './../../../validation/schemas/employee.schema';
import { defaultEmployeePhotoPath } from '../../../prisma/seed/data/employees.seed.data';
import { CreateEmployeeDto } from '../../dto/employee/dto/create-employee.dto';
import { RequireAdmin } from '../../../guards/roles.';

@ApiBearerAuth()
@ApiTags('Admin - employees')
@Controller('admin/employees')
@UseGuards(RequireAdmin)
export class AdminEmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiFile()
  create(
    @UploadedFile() file,
    @Body(ApplyValidation(createEmployeeSchema)) body: CreateEmployeeDto,
  ) {
    if (!file) body.photoPath = defaultEmployeePhotoPath;
    return this.employeesService.create(body);
  }
}
