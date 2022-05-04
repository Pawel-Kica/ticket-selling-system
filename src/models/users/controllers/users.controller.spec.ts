import pureOmit from '../../../utils/pureOmit';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import {
  expectToEqualError,
  expectToEqualObject,
} from '../../../tests/helpers/customExpections';
import {
  ConflictExceptionInstance,
  InvalidCredentialsInstance,
} from '../../../tests/helpers/errors';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { SeedService } from '../../../prisma/seed/seed.service';
import { createUserOmitProperties } from '../../../tests/helpers/omitProperties';
import { Prisma } from '@prisma/client';

const example_login = {
  email: 'email@example.com',
  password: 'strongpassword',
};
const example_user = {
  name: 'name',
  surname: 'surname',
  ...example_login,
  dateOfBirth: new Date(),
};
const example_user_response = pureOmit(example_user, ['password']);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;
  let seedService: SeedService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, SeedService, UsersService, AuthService],
    }).compile();

    seedService = moduleRef.get<SeedService>(SeedService);
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    authService = moduleRef.get<AuthService>(AuthService);
  });
  afterAll(async () => {
    seedService.removeSpecificTable('user');
  });

  describe('Create', () => {
    let spyCreate: jest.SpyInstance<Promise<User>, [data: CreateUserDto]>;
    let spyCheckEmailAvailability: jest.SpyInstance<
      Promise<void | User>,
      [email: string]
    >;
    beforeAll(() => {
      spyCreate = jest.spyOn(usersService, 'create');
      spyCheckEmailAvailability = jest.spyOn(
        authService,
        'checkEmailAvailability',
      );
    });
    afterAll(() => {
      expect(spyCreate).toHaveBeenCalledTimes(1);
      expect(spyCheckEmailAvailability).toHaveBeenCalledTimes(2);

      spyCreate.mockRestore();
      spyCheckEmailAvailability.mockRestore();
    });
    it('Should create new user', async () => {
      expectToEqualObject(await usersController.createHandler(example_user), {
        data: example_user_response,
        omit: createUserOmitProperties,
      });
    });
    it('Should return error conflict exception', async () => {
      const res = await usersController
        .createHandler(example_user)
        .catch((e) => e);

      expectToEqualError(
        { body: { message: res.getResponse() }, status: res.getStatus() },
        ConflictExceptionInstance,
      );
    });
  });
  describe('login', () => {
    let findUniqueSpy: jest.SpyInstance<
      Promise<User>,
      [where: Prisma.UserWhereUniqueInput]
    >;
    let verifyPasswordSpy: jest.SpyInstance<
      Promise<void>,
      [passwordToVerify: string, hashed: string]
    >;
    beforeAll(() => {
      findUniqueSpy = jest.spyOn(usersService, 'findUnique');
      verifyPasswordSpy = jest.spyOn(authService, 'verifyPassword');
    });
    afterAll(() => {
      expect(findUniqueSpy).toHaveBeenCalledTimes(1);
      expect(verifyPasswordSpy).toHaveBeenCalledTimes(1);
      findUniqueSpy.mockRestore();
      verifyPasswordSpy.mockRestore();
    });
    it('should not be able to login with invalid credentials', async () => {
      const res = await usersController
        .loginHandler(example_login)
        .catch((e) => e);

      expectToEqualError(
        { body: { message: res.getResponse() }, status: res.getStatus() },
        InvalidCredentialsInstance,
      );
    });
  });
});
