import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('NestJS ticket selling system')
    .setDescription('nodejs trainee')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      name: 'JWT',
      description: 'Enter JWT token',
    })
    .addOAuth2()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
