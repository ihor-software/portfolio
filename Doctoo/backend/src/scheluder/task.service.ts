import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Appointment, AppointmentService } from 'src/appointment';
import { NotificationService } from 'src/notification';
import { AppGateway } from './notification.gateway';

@Injectable()
export class TasksService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly appointmentService: AppointmentService,
    private readonly appGateway: AppGateway,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronAppointmentNotification() {
    const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
    const appointments: Appointment[] = await this.appointmentService.findAll();
    appointments?.forEach(async appointment => {
      this.logger.log(currentDate);
      if (
        appointment.status_cd !== 'Canceled' &&
        appointment.date_time.getFullYear() === currentDate.getFullYear() &&
        appointment.date_time.getMonth() === currentDate.getMonth() &&
        appointment.date_time.getDate() === currentDate.getDate() &&
        appointment.date_time.getTime() - currentDate.getTime() <= 600000
      ) {
        if (!appointment.is_visited && !appointment.is_notified_time) {
          this.logger.log('appointment is soon notification');
          await this.appointmentService.update(appointment.id, { is_notified_time: true });
          await this.notificationService.create({
            type: 'appointment',
            appointment_id: appointment.id,
          });
          this.appGateway.notifyNewNotification();
        }
      }
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCronPaymentNotification() {
    const currentDate = new Date();
    const appointments: Appointment[] = await this.appointmentService.findAll();
    appointments?.forEach(async appointment => {
      if (
        appointment.date_time <= currentDate &&
        !appointment.is_paid &&
        appointment.is_visited &&
        !appointment.is_notified_pay
      ) {
        this.logger.log('payment notification');
        await this.appointmentService.update(appointment.id, { is_notified_pay: true });
        await this.notificationService.create({
          type: 'payment',
          appointment_id: appointment.id,
        });
        this.appGateway.notifyNewNotification();
      }
    });
  }
}
