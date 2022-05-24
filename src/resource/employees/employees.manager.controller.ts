// Nest
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiForbiddenResponseDescription,
  ApiSubjectNotFoundResponse,
} from '../../utils/responses/swagger';
// Types
import { EmployeeEntityDto } from '../../@types/models/employees.types.dto';
import { EmployeesLookupQuery } from '../../utils/query';
// Guards
import { RequireManager } from '../../guards/requireRole.guard';
// Services
import {
  defaultEmployeesTakeNumber,
  EmployeesService,
} from './employees.service';
// Data
import { employeesTestData } from '../../prisma/seed/data/employees.seed.data';
import { employeePrefix } from '../../prisma/seed/data/prefixes';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireManager)
@ApiTags('Manager - employees')
@Controller('manager/employees')
export class EmployeesManagerController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({
    description: `Returns filtered employees (filtering using query params)`,
  })
  @ApiQuery({
    name: 'take',
    description: 'Specify the number of employees you want to receive',
    examples: {
      empty: {
        value: '',
      },
      default: {
        value: defaultEmployeesTakeNumber,
      },
      example: {
        value: 1,
      },
    },
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'Filter by name property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: employeesTestData[0].name,
      },
    },
    required: false,
  })
  @ApiQuery({
    name: 'surname',
    description: 'Filter by surname property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: employeesTestData[0].surname,
      },
    },
    required: false,
  })
  @ApiQuery({
    name: 'telephoneNumber',
    description: 'Filter by telephoneNumber property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: employeesTestData[0].surname,
      },
    },
    required: false,
  })
  @ApiQuery({
    name: 'telephoneNumber',
    description: 'Filter by telephoneNumber property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: employeesTestData[0].telephoneNumber,
      },
    },
    required: false,
  })
  @Get()
  async findMany(
    @Query()
    { take, position, name, surname, telephoneNumber }: EmployeesLookupQuery,
  ): Promise<EmployeeEntityDto[]> {
    return this.employeesService.findMany(
      { position, name, surname, telephoneNumber },
      take,
    );
  }

  @ApiOperation({
    description: `Finds unique employee`,
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the ID of employee to be found',
    examples: {
      valid: {
        value: `${employeePrefix}1`,
      },
      notFound: {
        summary: 'not found',
        value: '123',
      },
    },
  })
  @ApiSubjectNotFoundResponse('Employee')
  @Get(':id')
  async findUnique(@Param('id') id: string): Promise<EmployeeEntityDto> {
    const employee = await this.employeesService.findUnique({ id });
    if (!employee) throw new NotFoundException();
    return employee;
  }
}
