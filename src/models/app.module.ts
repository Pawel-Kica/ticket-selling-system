import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionsModule } from './sessions/sessions.module';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { SeedModule } from '../prisma/seed/seed.module';
import { EmailToLowerCaseMiddleware } from '../middleware/emailToLowerCase';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: configService.get('NODE_ENV') === 'test' ? [] : ['info'],
            // datasources: {
            // db: {
            // url:
            // configService.get('NODE_ENV') === 'test'
            //   ? configService.get('DATABASE_URL_TEST')
            //   : configService.get('DATABASE_URL'),
            // },
            // },
          },
        };
      },
      inject: [ConfigService],
    }),
    SeedModule,
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
