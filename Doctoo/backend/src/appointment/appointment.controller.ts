import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import RequestWithUser from './../authentication/interface/requestWithUser.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('upcoming')
  @UseGuards(JwtAuthenticationGuard)
  findAllUpcoming(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.appointmentService.findUpcomingAppointments(user);
  }

  @Get('get-token')
  getToken() {
    return this.appointmentService.getToken();
  }

  @Post('create-meeting')
  createMeeting(@Body() body: { token: string; region: string; customRoomId: string }) {
    return this.appointmentService.createMeeting(body.token, body.region, body.customRoomId);
  }

  @Post('validate-meeting/:meetingId')
  validateMeeting(@Param('meetingId') meetingId: string, @Body() body: { token: string }) {
    return this.appointmentService.validateMeeting(meetingId, body.token);
  }

  @ApiCreatedResponse({ description: 'Appointment created successfully', type: Appointment })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @ApiOkResponse({ description: 'List of appointments', type: [Appointment] })
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @ApiOkResponse({ description: 'Appointment found successfully', type: Appointment })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @ApiOkResponse({ description: 'Appointment updated successfully', type: Appointment })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @ApiOkResponse({ description: 'Appointment deleted successfully' })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.remove(id);
  }

  @Get('patient/:patient_id')
  findAllByPatientId(@Param('patient_id', ParseIntPipe) id: number) {
    return this.appointmentService.findUpcomingAppointmentsByPatient(id);
  }

  @Get('doctor/:doctor_id')
  findAllByDoctorId(@Param('doctor_id', ParseIntPipe) id: number) {
    return this.appointmentService.findUpcomingAppointmentsByDoctor(id);
  }
}
