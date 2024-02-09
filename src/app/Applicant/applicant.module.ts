import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantService } from './Service/applicant.service';
import { Module } from '@nestjs/common';
import { ApplicantController } from './Controller/applicant.controller';
import { JwtStrategy } from '../strategies';
import { MailerModule } from '@nestjs-modules/mailer';
import { Applicant } from '../entity/applicant';
import { MailConfig } from 'src/libs/mail';

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
