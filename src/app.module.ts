// Nest
import { PrismaModule } from 'nestjs-prisma';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

// datasources: {
// db: {
// url:
// configService.get('NODE_ENV') === 'test'
//   ? configService.get('DATABASE_URL_TEST')
//   : configService.get('DATABASE_URL'),
// },
// },

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: configService.get('NODE_ENV') === 'test' ? [] : ['info'],
          },
        };
      },
      inject: [ConfigService],
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
