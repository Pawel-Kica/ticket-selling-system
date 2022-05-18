// Nest
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// Decorators
import { ApiFile } from '../../../decorators/apiFile.decorator';
// Services
import { EmployeesService } from '../../employees/employees.service';
// Validation
import { ApplyValidation } from '../../../validation/validationPipe';
import { createEmployeeSchema } from './../../../validation/schemas/employee.schema';
// Types
import { EmployeeEntityDto } from '../../../@types/models/employees.types.dto';
import { CreateEmployeeDto } from '../../dto/employee/dto/create-employee.dto';
// Guards
import { RequireAdmin } from '../../../guards/requireRole.guard';
// Config
import { defaultEmployeePhotoPath } from '../../../config/files.config';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@ApiTags('Admin - employees')
@Controller('admin/employees')
export class AdminEmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiFile()
  async create(
    @UploadedFile() file,
    @Body(ApplyValidation(createEmployeeSchema)) body: CreateEmployeeDto,
  ): Promise<EmployeeEntityDto> {
    if (!file) body.photoPath = defaultEmployeePhotoPath;
    return this.employeesService.create(body);
  }
}
