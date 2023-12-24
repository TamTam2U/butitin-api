import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicantDto } from '../dtos/CreateApplicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetStatusDto } from '../dtos/SetStatus.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Applicant } from 'src/app/entity/applicant';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
    private readonly mailService: MailerService,
  ) {}

  async findAllApplicant(): Promise<Applicant[]> {
    return await this.applicantRepository.find({ where: { deleteAt: null } });
  }

  async findAllApplicantByStatusPending(): Promise<Applicant[]> {
    return await this.applicantRepository.find({
      where: { status: 'pending' },
    });
  }

  async findAllApplicantByStatusRejected(): Promise<Applicant[]> {
    return await this.applicantRepository.find({
      where: { status: 'rejected' },
    });
  }

  async findAllApplicantByStatusAccepted(): Promise<Applicant[]> {
    return await this.applicantRepository.find({
      where: { status: 'accepted' },
    });
  }

  async findAllApplicantByStatusInterview(): Promise<Applicant[]> {
    return await this.applicantRepository.find({
      where: { status: 'interview' },
    });
  }

  async findOneApplicantById(id: string): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (!applicant) throw new NotFoundException('Pelamar Tidak Ditemukan');
    return applicant;
  }

  async findOneApplicantByUserId(id: string): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { userId: id, deleteAt: null },
    });
    if (!applicant) throw new NotFoundException('Pelamar Tidak Ditemukan');
    return applicant;
  }

  async createApplicant(newApplicant: CreateApplicantDto): Promise<Applicant> {
    try {
      const applicant = new Applicant();
      applicant.createAt = new Date().toISOString();
      applicant.status = 'pending';
      const cekNik = await this.applicantRepository.findOne({
        where: { nik: newApplicant.nik, deleteAt: null },
      });
      const cekUser = await this.applicantRepository.findOne({
        where: { userId: newApplicant.userId, deleteAt: null },
      });
      if (cekUser) {
        throw new BadRequestException('User sudah terdaftar');
      }
      if (cekNik) {
        throw new BadRequestException('NIK sudah terdaftar');
      }
      for (const key in newApplicant) {
        applicant[key] = newApplicant[key];
      }
      if (await this.applicantRepository.save(applicant)) {
        return applicant;
      } else {
        throw new BadRequestException('Gagal Mendaftarkan Pelamar');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async setStatusInterview(id: SetStatusDto): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { id: id.id, deleteAt: null },
    });
    if (applicant && applicant.status === 'pending') {
      try {
        this.mailService.sendMail({
          to: applicant.email,
          subject: 'Butitin - Status Interview',
          html: 'Selamat ' + applicant.name + ' Telah Lulus Untuk Interview',
        });
        applicant.status = 'interview';
        if (await this.applicantRepository.save(applicant)) {
          return applicant;
        } else {
          throw new BadRequestException('Terjadi Kegagalan');
        }
      } catch (err) {
        throw new err();
      }
    } else {
      throw new NotFoundException('Pelamar Tidak Ditemukan');
    }
  }

  async setStatusAccepted(id: SetStatusDto): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { id: id.id, deleteAt: null },
    });
    if (applicant && applicant.status === 'interview') {
      try {
        this.mailService.sendMail({
          to: applicant.email,
          subject: 'Butitin - Status Acepted',
          html: 'Selamat ' + applicant.name + ' Telah Diterima Untuk Pekerjaan',
        });
        applicant.status = 'accepted';
        if (await this.applicantRepository.save(applicant)) {
          return applicant;
        } else {
          throw new BadRequestException('Terjadi Kegagalan');
        }
      } catch (err) {
        throw new err();
      }
    } else {
      throw new NotFoundException('Pelamar Belum Interview');
    }
  }

  async setStatusRejected(id: SetStatusDto): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { id: id.id, deleteAt: null },
    });
    if (applicant) {
      try {
        this.mailService.sendMail({
          to: applicant.email,
          subject: 'Butitin - Status Rejected',
          html: 'Mohon Maaf ' + applicant.name + ' Tidak Lulus Untuk Pekerjaan',
        });
        applicant.status = 'rejected';
        if (await this.applicantRepository.save(applicant)) {
          return applicant;
        } else {
          throw new BadRequestException('Gagal Mendaftarkan Pelamar');
        }
      } catch (err) {
        throw new err();
      }
    } else {
      throw new NotFoundException('Pelamar Tidak Ditemukan');
    }
  }
}
