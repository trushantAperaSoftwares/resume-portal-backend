import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service'; // <-- path expects src/prisma.service.ts
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [UsersModule, JobsModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
