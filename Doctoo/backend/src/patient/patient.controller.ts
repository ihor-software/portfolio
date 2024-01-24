import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Patient } from './entities';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import { UpdatePatientConditionsDto } from './dto/update-patient-conditions.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @ApiOkResponse({ description: 'List of patients', type: [Patient] })
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @ApiOkResponse({ description: 'Patient found successfully', type: [Patient] })
  @Get(':user_id')
  findOne(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.patientService.findOne(user_id);
  }

  @ApiCreatedResponse({ description: 'Patient created successfully', type: Patient })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @ApiOkResponse({
    description: 'Patient allergies and medical conditions updated successfully',
    type: Patient,
  })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':user_id/conditions')
  updateConditions(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() updatePatientConditionsDto: UpdatePatientConditionsDto,
  ) {
    return this.patientService.updateConditions(user_id, updatePatientConditionsDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({ description: 'Patient updated successfully', type: Patient })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':user_id')
  update(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(user_id, updatePatientDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({ description: 'Patient deleted successfully' })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  @Delete(':user_id')
  remove(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.patientService.remove(user_id);
  }
}
