// Nest
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
// Middlewares
import { Trimmer } from './middleware/trimmer';
import { Deserialize } from './middleware/deserialize';
import { EmailToLowerCase } from './middleware/emailToLowerCase';
import { prismaHashPasswordMiddleware } from './middleware/prismaHashPassoword';
// Modules
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './utils/jwt/jwt.module';
import { UsersModule } from './resource/users/users.module';
import { AdminModule } from './resource/admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';
import { StationsModule } from './resource/stations/stations.module';
import { EmployeesModule } from './resource/employees/employees.module';
// Controllers
import { AppController } from './app.controller';
// Others
import { mainDir } from './config/files.config';
import { PostInterceptor } from './interceptors/postMethod';
import { PricesModule } from './resource/prices/prices.module';
import { RoutesModule } from './resource/routes/routes.module';

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
    EmployeesModule,
    PricesModule,
    RoutesModule,
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
