// Nest
import { PrismaModule } from 'nestjs-prisma';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Middlewares
import { Trimmer } from './middleware/trimmer';
import { Deserialize } from './middleware/deserialize';
import { EmailToLowerCase } from './middleware/emailToLowerCase';
import { prismaHashPasswordMiddleware } from './middleware/prismaHashPassoword';
// Modules
import { JwtModule } from './utils/jwt/jwt.module';
import { UsersModule } from './resource/users/users.module';
import { AdminModule } from './resource/admin/admin.module';
// Controllers
import { AppController } from './app.controller';
import { PostInterceptor } from './interceptors/postMethod';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    AdminModule,
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
