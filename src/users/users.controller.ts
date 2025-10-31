import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  SetMetadata,
  Param,Put,
  Delete
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // user post route
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
  @Post('create')
  async create(
    @Body() body: { name: string; email: string; password: string; role: Role },
  ) {
    console.log('Received body:', body);
    return this.usersService.createUser(body);
  }

  // create login route
  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.usersService.loginUser(data);
  }

  // get all data
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
  getAll() {
    return this.usersService.getAll();
  }

  // get data by id
  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateById(Number(id), body);
  }


  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', [Role.ADMIN])
  delete(@Param('id') id: string) {
    return this.usersService.deleteById(Number(id));
  }

}
