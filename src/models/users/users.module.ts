import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtModule } from '../../utils/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
