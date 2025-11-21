import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guards';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // Only Admin and HR can create job
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN, Role.HR])
  @UseGuards(RolesGuard)
  @Post('create')
  async createJob(@Body() dto: CreateJobDto, @Request() req) {
    const userId = req.user.user; // comes from JWT payload
    return this.jobsService.create(dto, userId);
  }

  // get all jobs
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  // get single job
  @Get(':id')
  async getJobById(@Param('id') id: string) {
    return this.jobsService.getJobById(Number(id));
  }

  // only admin and hr can edit the job using id
@UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN, Role.HR])
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
     return this.jobsService.update(Number(id), updateJobDto);
  }

  // only admin and hr delete job
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN, Role.HR])
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.jobsService.jobDeleteById(Number(id));
  }
}
