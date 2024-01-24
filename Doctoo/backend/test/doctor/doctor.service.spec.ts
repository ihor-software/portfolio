import { Test } from '@nestjs/testing';
import { Doctor, DoctorService } from 'src/doctor';
import { testDoctorInput, mockedDoctorService, ids } from './doctor.mock';
import { getModelToken } from '@nestjs/sequelize';
import { HttpException } from '@nestjs/common';

describe('DoctorController', () => {
  let doctorService: DoctorService;
  let model: typeof Doctor;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getModelToken(Doctor),
          useValue: {
            ...mockedDoctorService,
          },
        },
      ],
    }).compile();

    doctorService = module.get<DoctorService>(DoctorService);
    model = module.get<typeof Doctor>(getModelToken(Doctor));
  });

  it('should be defined', () => {
    expect(doctorService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      expect(await doctorService.findAll()).toEqual([testDoctorInput]);
      expect(model.findAll).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should find a doctor by existing id', async () => {
      expect(await doctorService.findOne(ids.valid)).toEqual(testDoctorInput);
      expect(model.findByPk).toBeCalled();
    });

    it('should throw exception when try to find a doctor by non existing id', async () => {
      await expect(doctorService.findOne(ids.invalid)).rejects.toThrow(HttpException);
    });
  });

  describe('create', () => {
    it('should create a doctor', async () => {
      expect(await doctorService.create(testDoctorInput)).toEqual(testDoctorInput);
      expect(model.create).toBeCalledWith(testDoctorInput);
    });
  });

  describe('update', () => {
    it('should update appointment', async () => {
      const updatedDoctor = { ...testDoctorInput, payrate: 50 };
      expect(await doctorService.update(ids.valid, updatedDoctor)).toEqual(updatedDoctor);
      expect(model.update).toBeCalledWith(updatedDoctor, {
        returning: true,
        where: { user_id: 1 },
      });
    });
  });

  describe('remove', () => {
    it('should remove a doctor', async () => {
      await doctorService.remove(ids.valid);
      expect(model.destroy).toBeCalled();
    });

    it('should throw an exception when removing non existent doctor', async () => {
      await expect(doctorService.remove(ids.invalid)).rejects.toThrow(HttpException);
    });
  });
});
