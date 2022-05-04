// Nest
import { PrismaModule } from 'nestjs-prisma';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Middlewares
import { Deserialize } from './middleware/deserialize';
import { EmailToLowerCase } from './middleware/emailToLowerCase';
// Modules
import { SessionsModule } from './models/sessions/sessions.module';
// Controllers
import { AppController } from './app.controller';
// Services
import { JwtService } from './utils/jwt/jwt.service';
import { UsersModule } from './models/users/users.module';
import { CookiesService } from './utils/cookies/cookies.service';

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
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
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
    UsersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [JwtService, CookiesService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Deserialize).forRoutes('*');
    consumer.apply(EmailToLowerCase).forRoutes('*');
  }
}
