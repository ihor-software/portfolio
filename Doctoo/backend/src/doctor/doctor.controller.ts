import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { Doctor } from './entities';
import { CreateDoctorDto, UpdateDoctorDto } from './dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiCreatedResponse({ description: 'Doctor created successfully', type: Doctor })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @ApiOkResponse({ description: 'List of doctors', type: [Doctor] })
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @ApiOkResponse({ description: 'List of doctors', type: [Doctor] })
  @Get('available')
  findAllAvailable() {
    return this.doctorService.findAllAvailableDoctors();
  }

  @ApiOkResponse({ description: 'List of doctors', type: [Doctor] })
  @Get('search')
  async search(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('specialty') specialty: string,
    @Query('hospital') hospital: string,
  ) {
    const doctors = await this.doctorService.searchDoctors(
      keyword,
      page,
      pageSize,
      specialty,
      hospital,
    );
    return doctors;
  }

  @ApiOkResponse({ description: 'Doctor found successfully', type: Doctor })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.findOne(id);
  }

  @ApiOkResponse({ description: 'Doctor updated successfully', type: Doctor })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @ApiOkResponse({ description: 'Doctor deleted successfully' })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.remove(id);
  }
}
