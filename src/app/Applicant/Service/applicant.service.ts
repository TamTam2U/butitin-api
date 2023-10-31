import { Inject, Injectable } from '@nestjs/common';
import { applicant } from 'src/app/entity';
import { CreateApplicantDto } from '../dtos/CreateApplicant.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @Inject('APPLICANT_REPOSITORY')
    private readonly applicantRepository: typeof applicant,
  ) {}

  async getAll(): Promise<applicant[]> {
    return await this.applicantRepository.findAll<applicant>();
  }

  async getOne(id: number): Promise<applicant> {
    return await this.applicantRepository.findOne({ where: { id: id } });
  }

  async createApplicant(newApplicant: CreateApplicantDto): Promise<applicant> {
    return await this.applicantRepository.create(newApplicant);
  }

  async editApplicant(
    id: number,
    newApplicant: CreateApplicantDto,
  ): Promise<applicant | undefined> {
    try {
      const [affectedCount] = await this.applicantRepository.update(
        newApplicant,
        {
          where: { id: id },
        },
      );
      if (affectedCount > 0) {
        const updatedApplicant = await this.applicantRepository.findByPk(id);
        return updatedApplicant;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error updating applicant:', error);
      throw error;
    }
  }

  async deleteApplicant(id: number) {
    try {
      const applicantToDelete = await this.applicantRepository.findByPk(id);
      if (applicantToDelete) {
        await applicantToDelete.destroy();
        return applicantToDelete;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error deleting applicant:', error);
      throw error;
    }
  }
}
