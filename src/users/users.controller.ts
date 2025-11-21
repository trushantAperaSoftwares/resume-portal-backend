import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  SetMetadata,
  Param,
  Put,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guards';
import { UsersCreateDto } from './dto/users-create.dto';
import { LoginDto } from './dto/login.dto';
import { UsersUpdateDto } from './dto/users-update.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

<<<<<<< HEAD
// create 
  @Post()
  async createUser(@Body() createDto: UsersCreateDto) {
    return this.usersService.createUser(createDto);
  }
  
  // 
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
=======
  // @UseGuards(AuthGuard)
  // @SetMetadata('role', [Role.ADMIN, Role.HR])
  // @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
>>>>>>> 4e2483f (guards update)
  @Post('create')
  async create(@Body() createDto: UsersCreateDto) {
    return this.usersService.createUser(createDto);
  }

  // create login route
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.loginUser(loginDto);
  }

  // get all data
<<<<<<< HEAD
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
=======
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
  @Get()
>>>>>>> 4e2483f (guards update)
  async getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.usersService.getAllUsers(page, limit, search);
  }

  // get data by id

  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() usersUpdateDto: UsersUpdateDto) {
    return this.usersService.updateById(Number(id), usersUpdateDto);
  }

  @UseGuards(AuthGuard)
  @SetMetadata('roles', [Role.ADMIN])
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteById(Number(id));
  }
}
