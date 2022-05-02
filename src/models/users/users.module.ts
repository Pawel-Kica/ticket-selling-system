import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UsersController],
  providers: [AuthService, UsersService],
})
export class UsersModule {}
