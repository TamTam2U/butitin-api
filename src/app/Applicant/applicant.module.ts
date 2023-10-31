import { ApplicantController } from './Controller/applicant.controller';
import { ApplicantService } from './Service/applicant.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ApplicantController],
  providers: [ApplicantService],
})
export class ApplicantModule {}
