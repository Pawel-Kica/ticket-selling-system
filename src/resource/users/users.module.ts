import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '../../utils/jwt/jwt.module';
import { AuthService } from './auth.service';
import { ManagerController } from './manager.controller';

@Module({
  imports: [JwtModule],
  controllers: [UsersController, ManagerController],
  providers: [AuthService, UsersService],
  exports: [AuthService, UsersService],
})
export class UsersModule {}
