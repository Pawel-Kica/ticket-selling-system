// Nest
import { Module } from '@nestjs/common';
// Modules
import { JwtModule } from '../../utils/jwt/jwt.module';
// Controllers
import { UsersController } from './users.controller';
// Services
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [AuthService, UsersService],
  exports: [AuthService, UsersService],
})
export class UsersModule {}
