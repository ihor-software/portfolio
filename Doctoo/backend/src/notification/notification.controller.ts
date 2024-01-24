import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto';
import { Notification } from './entities';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiCreatedResponse({ description: 'Notification created successfully', type: Notification })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createAppointmentDto: CreateNotificationDto) {
    return this.notificationService.create(createAppointmentDto);
  }

  @ApiOkResponse({ description: 'List of notifications', type: [Notification] })
  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @ApiOkResponse({ description: 'List of notifications', type: [Notification] })
  @Get('patient/:patient_id')
  findAllByPatientId(@Param('patient_id', ParseIntPipe) id: number) {
    return this.notificationService.getNotificationsForPatient(id);
  }
}
