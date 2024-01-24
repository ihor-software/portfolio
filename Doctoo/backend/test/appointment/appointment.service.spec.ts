import { Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Appointment, AppointmentService } from 'src/appointment';
import {
  appointments,
  existingId,
  nonExistingId,
  testAppointment,
  mockedAppointmentService,
  updateAppointmentData,
  updatedAppointment,
} from './appointment.mock';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let model: typeof Appointment;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getModelToken(Appointment),
          useValue: {
            ...mockedAppointmentService,
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    model = module.get<typeof Appointment>(getModelToken(Appointment));
  });

  it('should find all appointments', async () => {
    expect(await service.findAll()).toEqual(appointments);
    expect(model.findAll).toBeCalled();
  });

  it('should find appointment by existing id', async () => {
    expect(await service.findOne(existingId)).toEqual(appointments[0]);
  });

  it('should throw when try to find appointment by non existing id', async () => {
    await expect(service.findOne(nonExistingId)).rejects.toThrow(HttpException);
  });

  it('should create appointment', async () => {
    expect(await service.create(testAppointment)).toEqual(testAppointment);
    expect(model.create).toBeCalledWith(testAppointment);
  });

  it('should update appointment', async () => {
    expect(await service.update(existingId, updateAppointmentData)).toEqual(updatedAppointment);
    expect(model.update).toBeCalledWith(updateAppointmentData, {
      returning: true,
      where: { id: 1 },
    });
  });

  it('should remove appointment', async () => {
    await service.remove(existingId);
    expect(model.destroy).toBeCalled();
  });
});
