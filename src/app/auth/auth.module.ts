import { AuthController } from './controller/auth.controller';
import { UserModule } from '../User/user.module';
import { AuthService } from './service/auth.service';
import { Module } from '@nestjs/common';
import { UserService } from '../User/Service/user.service';
import { UserProviders } from '../User/Provider/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: 86400 },
  }),],
  controllers: [AuthController],
  providers: [AuthService,UserService, ...UserProviders],
})
export class AuthModule {}
