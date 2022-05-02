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

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let spy: jest.SpyInstance<Promise<User>, [data: CreateUserDto]>;

  const data = {
    name: 'name',
    surname: 'surname',
    email: 'email@example.com',
    password: 'strongpassword',
    dateOfBirth: new Date(),
  };
  const result = pureOmit(data, ['password']);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService, AuthService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('Create', () => {
    beforeAll(() => {
      spy = jest.spyOn(usersService, 'create');
    });
    afterAll(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
    it('Should create new user', async () => {
      expectToEqualObject(await usersController.createHandler(data), result, [
        'id',
        'password',
      ]);
    });

    it('Email already exists', async () => {
      expectToEqualError(
        await usersController.createHandler(data).catch((e) => e),
        ConflictExceptionInstance,
      );
    });
  });
});
