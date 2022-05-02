import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
