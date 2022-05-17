// Nest
import { Module } from '@nestjs/common';
// Modules
import { JwtModule } from '../../utils/jwt/jwt.module';
// Controllers
import { BossController } from './boss.controller';
import { UsersController } from './users.controller';
import { ManagerController } from './manager.controller';
// Services
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Module({
  imports: [JwtModule],
  controllers: [UsersController, ManagerController, BossController],
  providers: [AuthService, UsersService],
  exports: [AuthService, UsersService],
})
export class UsersModule {}
