import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guards';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true, // makes JwtService available everywhere
      secret: process.env.jwtPrivateKey,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthGuard, RolesGuard],
  exports: [JwtModule],
})
export class AuthModule {}
