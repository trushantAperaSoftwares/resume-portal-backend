import {
  Controller,
  Get,
  Post,
  Body,
<<<<<<< HEAD
  Patch,
=======
>>>>>>> 4e2483f (guards update)
  Param,
  Delete,
  SetMetadata,
  Put,
  Req,
<<<<<<< HEAD
  ParseIntPipe, ForbiddenException
=======
  ParseIntPipe,
  ForbiddenException,
>>>>>>> 4e2483f (guards update)
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';

import { AuthGuard } from 'src/auth/auth.guards';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  // create skills
<<<<<<< HEAD
  @Post('create')
  @UseGuards(AuthGuard)
=======
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
  @Post('create')
>>>>>>> 4e2483f (guards update)
  async createSkill(@Body() dto: CreateSkillDto, @Req() req: any) {
    const userRole = req.user.role;

    if (userRole !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can create skills');
    }

    return this.skillsService.createSkill({ ...dto });
  }

  // findAll
  @Get()
  async getAll() {
    return await this.skillsService.findAll();
  }

  // get skill by id
  @Get(':id')
  async getByID(@Param('id', ParseIntPipe) id: number) {
    return await this.skillsService.getById(id);
  }

  // delete skill by id
<<<<<<< HEAD
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
=======
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
>>>>>>> 4e2483f (guards update)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.skillsService.deleteSkill(id);
  }
}
