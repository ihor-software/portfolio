import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './entities';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { MedicalCondition } from 'src/medical-conditions/entities/medical-condition.entity';
import { Allergy } from 'src/allergies/entities/allergy.entity';
import { UpdatePatientConditionsDto } from './dto/update-patient-conditions.dto';
import { Doctor, Hospital, Specialty } from 'src/doctor';
import { User } from 'src/user';

@Injectable()
export class PatientService {
  constructor(@InjectModel(Patient) private patientRepository: typeof Patient) {}
  private logger = new Logger(PatientService.name);

  findAll() {
    return this.patientRepository.findAll();
  }

  async findOne(user_id: number) {
    const patient = await this.patientRepository.findByPk(user_id, {
      include: [
        MedicalCondition,
        Allergy,
        {
          model: Doctor,
          attributes: ['payrate', 'available'],
          include: [
            { model: Specialty, attributes: ['specialty'] },
            { model: Hospital, attributes: ['name'] },
            { model: User, attributes: ['first_name', 'last_name'] },
          ],
        },
      ],
    });
    if (!patient) throw new NotFoundException('Patient not found');

    return patient;
  }

  create(createPatientDto: CreatePatientDto) {
    return this.patientRepository.create(createPatientDto);
  }

  async update(user_id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(user_id);
    if (!patient) throw new NotFoundException('Patient not found');
    const [affectedCount, [updatedPatient]] = await this.patientRepository.update(
      updatePatientDto,
      {
        where: { user_id },
        returning: true,
      },
    );

    if (affectedCount > 0) {
      this.logger.log('Patient updated');
    }

    return updatedPatient;
  }

  async updateConditions(user_id: number, updatePatientConditionsDto: UpdatePatientConditionsDto) {
    const patient = await this.findOne(user_id);
    if (!patient) throw new NotFoundException('Patient not found');
    try {
      await patient.$set('allergies', updatePatientConditionsDto.allergies);
    } catch (error) {
      throw new NotFoundException('Allergy not found');
    }
    try {
      await patient.$set('medicalConditions', updatePatientConditionsDto.conditions);
    } catch (error) {
      throw new NotFoundException('Medical condition not found');
    }
    return await patient.reload();
  }

  async remove(user_id: number) {
    const patient = await this.findOne(user_id);
    if (!patient) throw new NotFoundException('Patient not found');

    await this.patientRepository.destroy({ where: { user_id } });
    this.logger.log('Patient deleted');
  }
}
