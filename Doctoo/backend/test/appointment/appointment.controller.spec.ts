import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController, AppointmentService } from 'src/appointment';
import {
  appointments,
  existingId,
  mockedAppointmentService,
  testAppointment,
  updateAppointmentData,
  updatedAppointment,
} from './appointment.mock';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        {
          provide: AppointmentService,
          useValue: { ...mockedAppointmentService, update: jest.fn(() => updatedAppointment) },
        },
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should create a new appointment', async () => {
    expect(await controller.create(testAppointment));
    expect(await service.create(testAppointment)).toEqual(testAppointment);
  });

  it('should find all appointments', async () => {
    expect(await controller.findAll());
    expect(await service.findAll()).toEqual(appointments);
  });

  it('should find appointment by id', async () => {
    expect(await controller.findOne(existingId));
    expect(await service.findOne(existingId)).toEqual(appointments[0]);
  });

  it('should update appointment by id', async () => {
    expect(await controller.update(existingId, updateAppointmentData));
    expect(await service.update(existingId, updateAppointmentData)).toEqual(updatedAppointment);
  });

  it('should delete appointment by id', async () => {
    const removeSpy = jest.spyOn(service, 'remove');
    await controller.remove(existingId);
    expect(removeSpy).toBeCalledWith(existingId);
  });
});
