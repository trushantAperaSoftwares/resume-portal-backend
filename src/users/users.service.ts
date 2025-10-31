import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
var jwt = require('jsonwebtoken');
var md5 = require('md5');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // create
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) {
    let passwordHash = md5(data.password);
    console.log(passwordHash);
    try {
      let createUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: passwordHash,
          role: data.role,
        },
      });
    } catch (error) {
      console.log('error', error);
      throw new HttpException('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      massage: 'User Created',
      statusCode: 200,
    };
  }

  // create user login
  async loginUser(data: { email: string; password: string }) {
    let jwtToken;
    const getUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    let hashpassword = await md5(data.password);

    if (!getUserByEmail) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (getUserByEmail.password != hashpassword) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }

    try {
      var token = jwt.sign(
        { user: getUserByEmail.id, role: getUserByEmail.role },
        process.env.jwtPrivateKey,
      );
      jwtToken = token;
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        'Password not match',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      massage: 'User login sucesss',
      statusCode: 200,
      data: token,
    };
  }

  //   get user
  getAll() {
    return this.prisma.user.findMany();
  }

  //   get user by id
  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async updateById(
    id: number,
    data: { name?: string; email?: string; password?: string; role?: Role },
  ) {
    try {
      let updateData = { ...data };

      if (data.password) {
        updateData.password = md5(data.password);
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });

      return {
        message: 'User updated successfully',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      console.log('Error updating user:', error);
      throw new HttpException(
        'User update failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // delete by id
  async deleteById(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return {
        message: 'delete data successfully',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      console.log(error, 'error for deleting user');
      throw new HttpException(
        'user fail to delete',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
