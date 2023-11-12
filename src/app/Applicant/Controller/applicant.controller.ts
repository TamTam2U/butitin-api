import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApplicantService } from '../Service/applicant.service';
import { CreateApplicantDto } from '../dtos/CreateApplicant.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Applicant')
@Controller('applicant')
export class ApplicantController {
    constructor(private readonly applicantService : ApplicantService){}

    @Get('/all')
    async findAll(){
        return await this.applicantService.getAll();
    }

    @Get('/one/:id')
    async findOne(@Param('id') id: number){
        return await this.applicantService.getOne(id);
    }

    @Post('/create')
    async createApplicant(@Body() newApplicant : CreateApplicantDto){
        return await this.applicantService.createApplicant(newApplicant);
    }

    @Put('/edit/:id')
    async editApplicant(@Body() newApplicant : CreateApplicantDto, @Param('id') id: number){
        return await this.applicantService.editApplicant(id, newApplicant);
    }

    @Delete('/delete/:id')
    async deleteApplicant(@Param('id') id: number){
        return await this.applicantService.deleteApplicant(id);
    }
}
