import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,private reflector: Reflector) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );

    const authorization = request.headers.authorization;

    const token = authorization.split(' ')[1];

    if (!requiredRoles) {
      return false;
    }

    if (!token) {
      throw new UnauthorizedException('token not found');
    }

    try {

      const user = await this.jwtService.verifyAsync(token, {secret: process.env.jwtPrivateKey,})

      const userRole = user.role;

      return requiredRoles.includes(userRole)
      
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException("Invalid Token")
    }
  }
}
