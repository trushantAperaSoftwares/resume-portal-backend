import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SkillsController],
  providers: [SkillsService, PrismaService],
})
<<<<<<< HEAD
export class SkillsModule {}
=======
export class SkillsModule {}
>>>>>>> 4e2483f (guards update)
