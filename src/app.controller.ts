import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getHello(): Promise<string> {
    console.log(await this.prisma.user.findMany());
    return 'Hello World!';
  }
}
