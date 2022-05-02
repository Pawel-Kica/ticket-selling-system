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

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, SeedService, UsersService, AuthService],
    }).compile();

    seedService = moduleRef.get<SeedService>(SeedService);
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    authService = moduleRef.get<AuthService>(AuthService);

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
