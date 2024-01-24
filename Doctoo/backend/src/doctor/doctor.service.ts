import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor, Hospital, Specialty } from './entities';
import { CreateDoctorDto, UpdateDoctorDto } from './dto';
import { User } from 'src/user';
import { Op } from 'sequelize';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorRepository: typeof Doctor) {}

  private readonly logger = new Logger(DoctorService.name);

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor | void> {
    this.logger.log(`Doctor ${createDoctorDto.user_id} created`);

    return this.doctorRepository.create(createDoctorDto);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.findAll({
      include: [
        { model: Specialty, attributes: ['specialty'] },
        { model: Hospital, attributes: ['name'] },
        { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
      ],
    });
  }

  async findAllByParams(): Promise<Doctor[]> {
    return this.doctorRepository.findAll({
      include: [
        { model: Specialty, attributes: ['specialty'] },
        { model: Hospital, attributes: ['name'] },
        { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
      ],
    });
  }

  async findOne(doctorId: number): Promise<Doctor | void> {
    const doctor = await this.doctorRepository.findByPk(doctorId, {
      include: [
        { model: Specialty, attributes: ['specialty'] },
        { model: Hospital, attributes: ['name'] },
        { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
      ],
    });
    if (!doctor) {
      throw new NotFoundException('Doctor was not found!');
    }
    return doctor;
  }

  async update(doctorId: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor | void> {
    const doctor = await this.findOne(doctorId);
    if (!doctor) return;

    const [numberOfAffectedRows, [updatedDoctor]] = await this.doctorRepository.update(
      updateDoctorDto,
      {
        where: { user_id: doctorId },
        returning: true,
      },
    );

    if (numberOfAffectedRows > 0) {
      this.logger.log(`Doctor ${doctorId} updated`);
    }

    return updatedDoctor;
  }

  async remove(doctorId: number): Promise<void> {
    const doctor = await this.findOne(doctorId);

    if (doctor) {
      this.doctorRepository.destroy({ where: { user_id: doctorId } });
      this.logger.log(`User ${doctorId} deleted`);
    }
  }

  async searchDoctors(
    keyword: string,
    page: number,
    pageSize: number,
    specialty?: string,
    hospital?: string,
  ) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return this.doctorRepository.findAll({
      include: [
        {
          model: Specialty,
          attributes: ['specialty', 'specialty_id'],
          where: {
            [Op.or]: [{ specialty: { [Op.iLike]: `%${specialty ?? ''}%` } }],
          },
        },
        {
          model: Hospital,
          attributes: ['name', 'hospital_id'],
          where: {
            [Op.or]: [{ name: { [Op.iLike]: `%${hospital ?? ''}%` } }],
          },
        },
        {
          model: User,

          attributes: ['first_name', 'last_name', 'avatar'],
          where: {
            [Op.or]: [
              { first_name: { [Op.iLike]: `%${keyword}%` } },
              { last_name: { [Op.iLike]: `%${keyword}%` } },
            ],
          },
        },
      ],
      offset,
      limit,
    });
  }

  async findAllAvailableDoctors() {
    const sql = `SELECT user_id
                 FROM "Doctors"
                 WHERE (SELECT COUNT(*) FROM "Appointments"
                        WHERE "Appointments"."doctor_id"="Doctors"."user_id"
                        AND "Appointments"."date_time"+INTERVAL '1 HOURS'>=CURRENT_DATE
                        AND "Appointments"."date_time"<CURRENT_DATE)=0;`;

    const availableDoctorsIds =
      (await this.doctorRepository.sequelize.query(sql))[0]?.map((item: any) => item.user_id) ?? [];

    return this.doctorRepository.findAll({
      where: {
        user_id: {
          [Op.in]: availableDoctorsIds,
        },
      },
      include: [
        { model: Specialty, attributes: ['specialty'] },
        { model: Hospital, attributes: ['name'] },
        { model: User },
      ],
    });
  }

  async findAllAvailableDoctorsBySpecialty(speciality: string) {
    const sql = `SELECT user_id
                 FROM "Doctors"
                 WHERE (SELECT COUNT(*) FROM "Appointments"
                       WHERE "Appointments"."doctor_id"="Doctors"."user_id"
                       AND "Appointments"."date_time"+INTERVAL '1 HOURS'>=CURRENT_DATE
                       AND "Appointments"."date_time"<CURRENT_DATE)=0
                 AND "Doctors"."specialty_id"=(SELECT "specialty_id" 
                                               FROM "Doctor_specialties"
                                               WHERE "Doctor_specialties"."specialty"=INITCAP('${speciality}'));`;

    const availableDoctorsIds =
      (await this.doctorRepository.sequelize.query(sql))[0]?.map((item: any) => item.user_id) ?? [];

    return this.doctorRepository.findAll({
      where: {
        user_id: {
          [Op.in]: availableDoctorsIds,
        },
      },
      include: [
        { model: Specialty, attributes: ['specialty'] },
        { model: Hospital, attributes: ['name'] },
        { model: User },
      ],
    });
  }
}
