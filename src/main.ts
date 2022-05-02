import { NestFactory } from '@nestjs/core';
import { AppModule } from './models/app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './prisma/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const seedService: SeedService = app.get(SeedService);
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('NestJS ticket selling system')
    .setDescription('nodejs trainee')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await seedService.main();

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
