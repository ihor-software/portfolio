import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Notification } from './entities';
import { CreateNotificationDto } from './dto';
import { Appointment } from 'src/appointment';
import { Doctor, Hospital, Specialty } from 'src/doctor';
import { User } from 'src/user';
import { Patient } from 'src/patient';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification) private notificationRepository: typeof Notification,
    @InjectModel(Appointment) private appointmentModel: typeof Appointment,
  ) {}

  private readonly logger = new Logger(NotificationService.name);

  async create(createNotificationDto: CreateNotificationDto) {
    const createdNotification = await this.notificationRepository.create({
      ...createNotificationDto,
    });

    this.logger.log(`Notification ${createdNotification.id} created`);

    return createdNotification;
  }

  async findAll() {
    return this.notificationRepository.findAll();
  }

  async getNotificationsForPatient(patientId: number) {
    const notifications = await this.notificationRepository.findAll({
      include: [
        {
          model: this.appointmentModel,
          where: {
            patient_id: patientId,
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'doctor_id', 'patient_id'],
          },
          include: [
            {
              model: Doctor,
              attributes: ['payrate', 'available'],
              include: [
                { model: Specialty, attributes: ['specialty'] },
                { model: Hospital, attributes: ['name'] },
                { model: User, attributes: ['first_name', 'last_name'] },
              ],
            },
            {
              model: Patient,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'user_id', 'family_doctor_id'],
              },
              include: [
                { model: User, attributes: ['first_name', 'last_name'] },
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
            },
          ],
        },
      ],
    });
    return notifications;
  }
}
