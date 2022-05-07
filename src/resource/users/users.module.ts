import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '../../utils/jwt/jwt.module';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [AuthService, UsersService],
  exports: [AuthService, UsersService],
})
export class UsersModule {}
