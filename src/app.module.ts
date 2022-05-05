// Nest
import { PrismaModule } from 'nestjs-prisma';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Middlewares
import { Deserialize } from './middleware/deserialize';
import { EmailToLowerCase } from './middleware/emailToLowerCase';
// Modules
// Controllers
import { AppController } from './app.controller';
// Services
import { UsersModule } from './models/users/users.module';
import { JwtModule } from './utils/jwt/jwt.module';

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
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(EmailToLowerCase).forRoutes('*');
    consumer.apply(Deserialize).forRoutes('*');
  }
}
