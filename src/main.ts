import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
