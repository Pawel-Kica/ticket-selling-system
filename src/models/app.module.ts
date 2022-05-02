import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { SeedModule } from '../prisma/seed/seed.module';
import { EmailToLowerCaseMiddleware } from '../middleware/emailToLowerCase';

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
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(EmailToLowerCaseMiddleware).forRoutes('*');
  }
}
