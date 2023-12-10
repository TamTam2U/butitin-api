import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApplicantService } from '../Service/applicant.service';
import { CreateApplicantDto } from '../dtos/CreateApplicant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/app/guards/jwt.guard';
import { SetStatusDto } from '../dtos/SetStatus.dto';
@ApiTags('Applicant')
@Controller('/api/applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Get('/all')
  async findAll() {
    return await this.applicantService.findAllApplicant();
  }

  @Get('/one/:id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.applicantService.findOneApplicantById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('/oneUser/:id')
  async findOneByUserId(@Param('id') id: string) {
    return await this.applicantService.findOneApplicantByUserId(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('/all/statusPending')
  async findAllStatusPending(@Req() req) {
    if (req.user.status === 'owner') {
      return await this.applicantService.findAllApplicantByStatusPending();
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('/all/statusInterview')
  async findAllStatusInterview(@Req() req) {
    if (req.user.status === 'owner') {
      return await this.applicantService.findAllApplicantByStatusInterview();
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('/all/statusRejected')
  async findAllStatusRejected(@Req() req) {
    if (req.user.status === 'owner') {
      return await this.applicantService.findAllApplicantByStatusRejected();
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Post('/create')
  async createApplicant(@Body() newApplicant: CreateApplicantDto, @Req() req) {
    if (req.user.id) {
      newApplicant.userId = req.user.id;
      return await this.applicantService.createApplicant(newApplicant);
    } else {
      return {
        status: 401,
        message: 'Harap Login terlebih dahulu',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Put('/setStatusInterview')
  async setStatusInterview(@Body() id: SetStatusDto, @Req() req) {
    if (req.user.status === 'owner') {
      return await this.applicantService.setStatusInterview(id);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Put('/setStatusAccepted')
  async setStatusAccepted(@Body() id: SetStatusDto, @Req() req) {
    if (req.user.status === 'owner') {
      return await this.applicantService.setStatusAccepted(id);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Put('/setStatusRejected')
  async setStatusRejected(@Body() id: SetStatusDto, @Req() req) {
    if (req.user.status === 'owner') {
      return await this.applicantService.setStatusRejected(id);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }
}
