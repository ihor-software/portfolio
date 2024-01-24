import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { Appointment } from './entities';
import { Doctor, Hospital, Specialty } from 'src/doctor';
import { User } from 'src/user';
import { Patient } from 'src/patient';

import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import fetch from 'node-fetch';

@Injectable()
export class AppointmentService {
  constructor(@InjectModel(Appointment) private appointmentRepository: typeof Appointment) {}

  private readonly logger = new Logger(AppointmentService.name);

  async create(createAppointmentDto: CreateAppointmentDto) {
    const createdAppointment = await this.appointmentRepository.create({
      ...createAppointmentDto,
    });

    this.logger.log(`Appointment ${createdAppointment.id} created`);

    return createdAppointment;
  }

  async findAll() {
    return this.appointmentRepository.findAll({
      include: [
        {
          model: Doctor,
          attributes: ['payrate', 'available', 'user_id', 'bio'],
          include: [
            { model: Specialty, attributes: ['specialty'] },
            { model: Hospital, attributes: ['name'] },
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
          ],
        },
        {
          model: Patient,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'family_doctor_id'],
          },
          include: [
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
            {
              model: Doctor,
              attributes: ['payrate', 'available', 'bio'],
              include: [
                { model: Specialty, attributes: ['specialty'] },
                { model: Hospital, attributes: ['name'] },
                { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
              ],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['doctor_id', 'patient_id', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    const appointment = await this.appointmentRepository.findByPk(id, {
      include: [
        {
          model: Doctor,
          attributes: ['payrate', 'available', 'user_id', 'bio'],
          include: [
            { model: Specialty, attributes: ['specialty'] },
            { model: Hospital, attributes: ['name'] },
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
          ],
        },
        {
          model: Patient,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
            {
              model: Doctor,
              attributes: ['payrate', 'available', 'bio'],
              include: [
                { model: Specialty, attributes: ['specialty'] },
                { model: Hospital, attributes: ['name'] },
                { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
              ],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['doctor_id', 'patient_id', 'createdAt', 'updatedAt'],
      },
    });

    if (appointment === null) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findByPk(id);
    if (appointment === null) {
      throw new NotFoundException('Appointment not found');
    }
    const [numberOfAffectedRows, [updatedAppointment]] = await this.appointmentRepository.update(
      { ...updateAppointmentDto },
      { where: { id }, returning: true },
    );

    if (numberOfAffectedRows > 0) {
      this.logger.log(`Appointment ${id} updated`);
    }
    return updatedAppointment;
  }

  async remove(id: number) {
    const appointment = await this.appointmentRepository.findByPk(id);

    if (appointment === null) {
      throw new NotFoundException('Appointment not found');
    }
    await this.appointmentRepository.destroy({
      where: {
        id: appointment.id,
      },
    });
    this.logger.log(`Appointment ${id} deleted`);
  }

  async findAllAppointmentsByPatient(patient_id: number) {
    return this.appointmentRepository.findAll({
      where: { patient_id },
      include: [
        {
          model: Doctor,
          attributes: ['payrate', 'available', 'user_id', 'bio'],
          include: [
            { model: Specialty, attributes: ['specialty'] },
            { model: Hospital, attributes: ['name'] },
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
          ],
        },
        {
          model: Patient,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
            {
              model: Doctor,
              attributes: ['payrate', 'available', 'bio'],
              include: [
                { model: Specialty, attributes: ['specialty'] },
                { model: Hospital, attributes: ['name'] },
                { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
              ],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['doctor_id', 'patient_id', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findUpcomingAppointmentsByPatient(patient_id: number) {
    return this.appointmentRepository.findAll({
      where: { patient_id, status_cd: 'Planned', date_time: { [Op.gt]: new Date() } },
      order: [['date_time', 'ASC']],
      limit: 3,
      include: [
        {
          model: Doctor,
          attributes: ['payrate', 'available', 'user_id', 'bio'],
          include: [
            { model: Specialty, attributes: ['specialty'] },
            { model: Hospital, attributes: ['name'] },
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
          ],
        },
        {
          model: Patient,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
            {
              model: Doctor,
              attributes: ['payrate', 'available', 'bio'],
              include: [
                { model: Specialty, attributes: ['specialty'] },
                { model: Hospital, attributes: ['name'] },
                { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
              ],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['doctor_id', 'patient_id', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findUpcomingAppointmentsByDoctor(doctor_id: number) {
    return this.appointmentRepository.findAll({
      where: { doctor_id, status_cd: 'Planned', date_time: { [Op.gt]: new Date() } },
      order: [['date_time', 'ASC']],
      limit: 3,
      include: [
        {
          model: Doctor,
          attributes: ['payrate', 'available', 'user_id', 'bio'],
          include: [
            { model: Specialty, attributes: ['specialty'] },
            { model: Hospital, attributes: ['name'] },
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
          ],
        },
        {
          model: Patient,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
            {
              model: Doctor,
              attributes: ['payrate', 'available', 'bio'],
              include: [
                { model: Specialty, attributes: ['specialty'] },
                { model: Hospital, attributes: ['name'] },
                { model: User, attributes: ['first_name', 'last_name', 'avatar'] },
              ],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['doctor_id', 'patient_id', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findUpcomingAppointments(user: User) {
    if (user.role_cd === 'patient') {
      return this.findUpcomingAppointmentsByPatient(user.id);
    } else if (user.role_cd === 'doctor') {
      return this.findUpcomingAppointmentsByDoctor(user.id);
    }
  }

  private readonly API_KEY = process.env.VIDEOSDK_API_KEY;
  private readonly SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
  private readonly API_ENDPOINT = process.env.VIDEOSDK_API_ENDPOINT;

  async getToken() {
    const options: SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    const payload = {
      apikey: this.API_KEY,
      permissions: ['allow_join', 'allow_mod'],
    };
    const token = jwt.sign(payload, this.SECRET_KEY, options);
    return { token };
  }

  async createMeeting(token: string, region: string, customRoomId: string) {
    const url = `${this.API_ENDPOINT}/rooms`;
    const options = {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ customRoomId, region }),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  }

  async validateMeeting(meetingId: string, token: string) {
    const url = `${this.API_ENDPOINT}/rooms/validate/${meetingId}`;
    const options = {
      method: 'POST',
      headers: { Authorization: token },
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  }
}
