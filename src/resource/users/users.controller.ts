// Nest
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
// Types
import {
  CreateUserDtoExtended,
  LoginUserDto,
  CreateUserResponseDto,
} from '../../@types/models/users.types.dto';
// Validation
import {
  loginUserSchema,
  createUserSchema,
} from '../../validation/schemas/user.schema';
import { ApplyValidation } from '../../validation/validationPipe';
// Guards
import { RequireUser } from '../../guards/requireUser.guard';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
  TokenResponseDto,
} from '../../utils/responses/main.dto';
import { InvalidCredentials } from '../../utils/responses/errors';
// Data
import {
  createUserBody,
  invalidCreateUserBody,
  invalidCredentialsLoginUserBody,
  loginUserBody,
} from '../../tests/data/users.test.data';
import {
  ApiBadRequestSchemaDescription,
  ApiForbiddenResponseDescription,
  schemaBadRequestDescription,
} from '../../utils/responses/swagger';

@ApiTags('Users - Main')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({
    description: `Creates a new user with default role`,
  })
  @ApiBody({
    type: CreateUserDtoExtended,
    examples: {
      valid: {
        summary: 'Valid',
        value: createUserBody,
      },
      invalidSchema: {
        summary: 'Invalid schema',
        value: invalidCreateUserBody,
      },
      types: {
        summary: 'Types',
        description: 'For enum values, look in body dto/schema',
        value: {
          documentType: 'passport',
          passwordRepetition: 'string',
          name: 'string',
          surname: 'string',
          email: 'string',
          password: 'string',
          documentNumber: 'string',
        },
      },
    },
  })
  @ApiBadRequestSchemaDescription()
  @ApiConflictResponse({
    description: 'Conflict, email already exists in database',
  })
  @UsePipes(ApplyValidation(createUserSchema))
  async create(
    @Body() body: CreateUserDtoExtended,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUserHandler(body);
  }

  @Post('login')
  @ApiOperation({
    description: `Login request or in other words, obtaining an authentication token`,
  })
  @ApiBody({
    type: LoginUserDto,
    examples: {
      valid: {
        summary: 'Valid',
        value: loginUserBody,
      },
      invalidCredentials: {
        summary: 'Invalid credentials',
        value: invalidCredentialsLoginUserBody,
      },
      types: {
        summary: 'Types',
        value: {
          email: 'string',
          password: 'string',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `${schemaBadRequestDescription} / Invalid login credentials`,
  })
  @UsePipes(ApplyValidation(loginUserSchema))
  async login(
    @Body() { email, password }: LoginUserDto,
  ): Promise<TokenResponseDto> {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentials();

    await this.authService.verifyPassword(password, user.password);

    return { token: this.authService.createAuthToken(user.id) };
  }

  @ApiBearerAuth()
  @Post('auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RequireUser)
  @ApiOperation({
    description: `Checks if the authentication token is valid`,
  })
  @ApiForbiddenResponseDescription()
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }
}
