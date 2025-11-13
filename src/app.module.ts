import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service'; // <-- path expects src/prisma.service.ts
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { CandidateModule } from './candidate/candidate.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [UsersModule, JobsModule, CandidateModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
