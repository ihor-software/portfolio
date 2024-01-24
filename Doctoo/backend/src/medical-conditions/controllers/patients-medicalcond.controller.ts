import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreatePatientsMedicalCondDto } from '../dto';
import { PatientsMedicalCondService } from '../services';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatientsMedicalCond } from '../entities';

@ApiTags('Patients-Medical_conditions')
@Controller('patients-medicalcond')
export class PatientsMedicalCondController {
  constructor(private patientsMedicalCondService: PatientsMedicalCondService) {}

  @ApiCreatedResponse({
    description: 'Patient`s medical condition created successfully',
    type: PatientsMedicalCond,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() dto: CreatePatientsMedicalCondDto) {
    return this.patientsMedicalCondService.create(dto);
  }

  @ApiOkResponse({ description: 'Patient`s medical condition deleted successfully' })
  @ApiNotFoundResponse({ description: 'Patient`s medical condition not found' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientsMedicalCondService.remove(id);
  }
}
