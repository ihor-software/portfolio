import { testDoctorInput } from './doctor.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController, DoctorService, UpdateDoctorDto } from 'src/doctor';

describe('DoctorController', () => {
  let doctorController: DoctorController;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    doctorController = module.get<DoctorController>(DoctorController);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(doctorController).toBeDefined();
  });

  describe('create', () => {
    it('should create a doctor', async () => {
      const createdDoctor = {
        ...testDoctorInput,
      };

      doctorService.create = jest.fn().mockResolvedValue(createdDoctor);

      const result = await doctorController.create(testDoctorInput);
      expect(result).toBe(createdDoctor);
    });
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      const doctors = [testDoctorInput];
      doctorService.findAll = jest.fn().mockResolvedValue(doctors);

      const result = await doctorController.findAll();
      expect(result).toBe(doctors);
    });
  });

  describe('findOne', () => {
    it('should return a doctor by id', async () => {
      const expectedDoctor = {
        ...testDoctorInput,
        user_id: 1,
      };
      doctorService.findOne = jest.fn().mockResolvedValue(expectedDoctor);

      const result = await doctorController.findOne(expectedDoctor.user_id);
      expect(result).toBe(expectedDoctor);
    });
  });

  describe('update', () => {
    it('should update a doctor', async () => {
      const initialDoctor = {
        ...testDoctorInput,
        user_id: 1,
      };

      const updatedDoctor = {
        ...initialDoctor,
        payrate: 50,
      };

      doctorService.update = jest.fn().mockResolvedValue(updatedDoctor);

      const result = await doctorController.update(initialDoctor.user_id, {
        ...updatedDoctor,
      } as UpdateDoctorDto);

      expect(result).toBe(updatedDoctor);
      expect(doctorService.update).toHaveBeenCalledWith(initialDoctor.user_id, updatedDoctor);
    });
  });

  describe('remove', () => {
    it('should delete a doctor', async () => {
      const doctor = {
        ...testDoctorInput,
        user_id: 1,
      };

      doctorService.remove = jest.fn().mockResolvedValue(null);

      await doctorController.remove(doctor.user_id);
      expect(doctorService.remove).toHaveBeenCalledWith(doctor.user_id);
    });
  });
});
