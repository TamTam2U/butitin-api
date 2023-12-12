import { AuthController } from './controller/auth.controller';
import { UserModule } from '../User/user.module';
import { AuthService } from './service/auth.service';
import { Module } from '@nestjs/common';
import { UserService } from '../User/Service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../constants';
import { JwtStrategy } from '../strategies/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local-strategy';
import { MailConfig } from 'libs/mail';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
          host:"smtp.gmail.com",
          auth: MailConfig
      }
    }),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 86400 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  // exports:[LocalStrategy]
})
export class AuthModule {}
