// Nest
import { PrismaModule } from 'nestjs-prisma';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Middlewares
import { Trimmer } from './middleware/trimmer';
import { Deserialize } from './middleware/deserialize';
import { EmailToLowerCase } from './middleware/emailToLowerCase';
// Modules
import { JwtModule } from './utils/jwt/jwt.module';
import { UsersModule } from './models/users/users.module';
// Controllers
import { AppController } from './app.controller';
import { PostInterceptor } from './interceptors/postMethod';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { prismaHashPasswordMiddleware } from './middleware/prismaHashPassoword';

// datasources: {

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [prismaHashPasswordMiddleware()],
      },
    }),
    JwtModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PostInterceptor,
    },
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Trimmer).forRoutes('*');
    consumer.apply(EmailToLowerCase).forRoutes('*');
    consumer.apply(Deserialize).forRoutes('*');
  }
}
