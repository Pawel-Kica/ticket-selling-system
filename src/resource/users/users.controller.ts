// Nest
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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
  Get,
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
} from '../../@types/utils/responses.types';
import {
  ApiAuthEndpointResponse,
  ApiInvalidRequestedBodySchemaResponse,
  ApiEmailAlreadyExists,
  schemaBadRequestDescription,
} from '../../utils/swagger';
import { InvalidCredentialsException } from '../../utils/responses/errors';
// Data
import {
  createUserObj,
  invalidCredentialsLoginUserBody,
  loginUserBody,
} from '../../tests/data/users.test.data';
import { loginProperties } from '../../config/loginProperties.config';
import {
  adminUser,
  bossUser,
  managerUser,
  testUser,
} from '../../prisma/seed/data/users.seed.data';
import { pick } from '../../utils/objects';

@ApiTags('Users - Main')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    description: `Creates a new user with default role`,
  })
  @ApiBody({
    type: CreateUserDtoExtended,
    examples: {
      valid: {
        value: createUserObj.valid.body,
      },
      invalidSchema: {
        summary: 'invalid schema',
        value: createUserObj.invalid.schema.body,
      },
      emailAlreadyExists: {
        summary: 'email already exists',
        value: createUserObj.invalid.emailAlreadyExists.body,
      },
    },
  })
  @ApiInvalidRequestedBodySchemaResponse()
  @ApiEmailAlreadyExists()
  @UsePipes(ApplyValidation(createUserSchema))
  @Post()
  async create(
    @Body() body: CreateUserDtoExtended,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUserHandler(body);
  }

  @ApiOperation({
    description: `Login request or in other words, obtain an authentication token`,
  })
  @ApiBody({
    type: LoginUserDto,
    examples: {
      createdUser: {
        value: loginUserBody,
      },
      default: {
        value: pick(testUser, loginProperties),
      },
      admin: {
        value: pick(adminUser, loginProperties),
      },
      manager: {
        value: pick(managerUser, loginProperties),
      },
      boss: {
        value: pick(bossUser, loginProperties),
      },
      invalidCredentials: {
        summary: 'invalid credentials',
        value: invalidCredentialsLoginUserBody,
      },
    },
  })
  @ApiBadRequestResponse({
    description: `${schemaBadRequestDescription}
    \nInvalid login credentials`,
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid Credentials',
        error: 'Bad Request',
      },
    },
  })
  @UsePipes(ApplyValidation(loginUserSchema))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() { email, password }: LoginUserDto,
  ): Promise<TokenResponseDto> {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentialsException();
    await this.authService.verifyPassword(password, user.password);
    return { token: this.authService.createAuthToken(user.id) };
  }

  @ApiBearerAuth()
  @ApiAuthEndpointResponse()
  @UseGuards(RequireUser)
  @HttpCode(HttpStatus.OK)
  @Post('auth')
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }

  @Get('123')
  return200() {
    console.log(process.env.DATABASE_URL);
    console.log(process.env.CHECKENV);
    return 200;
  }
}
