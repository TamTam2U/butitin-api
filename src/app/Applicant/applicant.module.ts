import { ApplicantController } from './Controller/applicant.controller';
import { ApplicantProvider } from './Provider/applicant.provider';
import { ApplicantService } from './Service/applicant.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ApplicantController],
  providers: [ApplicantService,...ApplicantProvider],
})
export class ApplicantModule {}
