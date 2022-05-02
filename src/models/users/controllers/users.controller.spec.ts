import pureOmit from '../../../helpers/pureOmit';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import {
  expectToEqualError,
  expectToEqualObject,
} from '../../../helpers/test/customExpections';
import { ConflictExceptionInstance } from '../../../helpers/test/errors';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { SeedService } from '../../../prisma/seed/seed.service';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  const data = {
    name: 'name',
    surname: 'surname',
    email: 'email@example.com',
    password: 'strongpassword',
    dateOfBirth: new Date(),
  };
  const createUserOmitProperties = ['id', 'password'];
  const result = pureOmit(data, ['password']);

  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;
  let seedService: SeedService;
  let spy1: jest.SpyInstance<Promise<User>, [data: CreateUserDto]>;
  let spy2: jest.SpyInstance<Promise<void>, [email: string]>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        ConfigService,
        PrismaService,
        SeedService,
        UsersService,
        AuthService,
      ],
    }).compile();

    seedService = moduleRef.get<SeedService>(SeedService);
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    authService = moduleRef.get<AuthService>(AuthService);

    seedService.removeTables();
  });

  describe('Create', () => {
    beforeAll(() => {
      spy1 = jest.spyOn(usersService, 'create');
      spy2 = jest.spyOn(authService, 'checkIfEmailAlreadyExists');
    });
    afterAll(() => {
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(2);
      spy1.mockRestore();
      spy2.mockRestore();
    });
    it('Should create new user', async () => {
      expectToEqualObject(
        await usersController.createHandler(data),
        result,
        createUserOmitProperties,
      );
    });
    it('Should return error conflict exception', async () => {
      expectToEqualError(
        await usersController.createHandler(data).catch((e) => e),
        ConflictExceptionInstance,
      );
    });
  });
});
