import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicantDto } from '../dtos/CreateApplicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from 'src/app/entity/Applicant';
import { SetStatusDto } from '../dtos/SetStatus.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  async findAllApplicant(): Promise<Applicant[]> {
    return await this.applicantRepository.find({ where: { deleteAt: null } });
  }

  async findAllApplicantByStatusPending(): Promise<Applicant[]> {
      return await this.applicantRepository.find({ where: { status: 'pending' } });
  }

  async findAllApplicantByStatusRejected(): Promise<Applicant[]> {
      return await this.applicantRepository.find({ where: { status: 'rejected' } });
  }

  async findAllApplicantByStatusAccepted(): Promise<Applicant[]> {
      return await this.applicantRepository.find({ where: { status: 'accepted' } });
  }

  async findAllApplicantByStatusInterview(): Promise<Applicant[]> {
      return await this.applicantRepository.find({ where: { status: 'interview' } });
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
    const applicant = new Applicant();
    applicant.createAt = new Date().toISOString();
    applicant.status = 'pending';
    for (const key in newApplicant) {
      applicant[key] = newApplicant[key];
    }
    if (await this.applicantRepository.save(applicant)) {
      return applicant;
    } else {
      throw new BadRequestException('Gagal Mendaftarkan Pelamar');
    }
  }

  async setStatusInterview(id: SetStatusDto): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { id: id.id, deleteAt: null },
    });
    if (applicant && applicant.status === 'pending') {
      try {
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
