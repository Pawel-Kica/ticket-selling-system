import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './models/users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { SessionsModule } from './models/sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
