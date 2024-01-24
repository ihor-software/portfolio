import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientsMedicalCondDto } from '../dto';
import { PatientsMedicalCond } from '../entities';

@Injectable()
export class PatientsMedicalCondService {
  constructor(
    @InjectModel(PatientsMedicalCond) private patientsMedicalCondRepo: typeof PatientsMedicalCond,
  ) {}
  private logger = new Logger(PatientsMedicalCondService.name);

  create(dto: CreatePatientsMedicalCondDto) {
    return this.patientsMedicalCondRepo.create(dto);
  }

  async remove(id: number) {
    const patientsMedicalCond = await this.patientsMedicalCondRepo.findByPk(id);
    if (!patientsMedicalCond) throw new NotFoundException('Patient`s medical condition not found');

    this.patientsMedicalCondRepo.destroy({ where: { id } });
    this.logger.log('Patient`s medical condition deleted');
  }
}
