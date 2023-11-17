import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantService } from './Service/applicant.service';
import { Module } from '@nestjs/common';
import { Applicant } from '../entity/Applicant';
import { ApplicantController } from './Controller/applicant.controller';
import { JwtStrategy } from '../strategies';


@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  controllers: [ApplicantController],
  providers: [ApplicantService,JwtStrategy],
  exports:[ApplicantService,TypeOrmModule.forFeature([Applicant])],
})
export class ApplicantModule {}
