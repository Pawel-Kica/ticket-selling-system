import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  // somewhere in your initialization file
  const config = new DocumentBuilder()
    .setTitle('NestJS ticket selling system')
    .setDescription('nodejs trainee')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        name: 'JWT',
        description: 'Enter JWT token',
      },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
