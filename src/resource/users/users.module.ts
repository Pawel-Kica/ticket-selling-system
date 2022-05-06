import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '../../utils/jwt/jwt.module';
import { ApiBearerAuth } from '@nestjs/swagger';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
@ApiBearerAuth('jwt')
export class UsersModule {}
