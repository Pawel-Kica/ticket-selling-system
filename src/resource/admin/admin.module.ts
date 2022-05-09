import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.controller';
import { AdminUsersController } from './controllers/admin.users.controller';

@Module({
  imports: [UsersModule],
  controllers: [AdminController, AdminUsersController],
})
export class AdminModule {}
