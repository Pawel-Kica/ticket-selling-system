import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { SeedModule } from '../prisma/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: { log: ['info'] },
      },
    }),
    SeedModule,
    UsersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
