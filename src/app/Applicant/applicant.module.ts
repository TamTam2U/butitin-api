import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantService } from './Service/applicant.service';
import { Module } from '@nestjs/common';
import { Applicant } from '../entity/Applicant';
import { ApplicantController } from './Controller/applicant.controller';
import { JwtStrategy } from '../strategies';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from 'libs/mail';

@Module({
  imports: [
    TypeOrmModule.forFeature([Applicant]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: MailConfig,
      },
    }),
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService, JwtStrategy],
  exports: [ApplicantService, TypeOrmModule.forFeature([Applicant])],
})
export class ApplicantModule {}
