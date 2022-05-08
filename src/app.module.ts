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
import { StationsModule } from './resource/stations/stations.module';
import { MulterModule } from '@nestjs/platform-express';
import { mainDir } from './config/files.config';

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
    MulterModule.register({
      dest: `./${mainDir}`,
    }),
    JwtModule,
    UsersModule,
    AdminModule,
    StationsModule,
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
