import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service'; // <-- path expects src/prisma.service.ts
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
