import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createPatientDto,
  existingUserPatientId,
  initialPatient,
  mockedPatients,
  patientMockRepo,
  updatePatientDto,
  updatedPatient,
} from './patient.mock';
import { Patient, PatientService } from 'src/patient';
import { MedicalCondition } from 'src/medical-conditions';
import { Allergy } from 'src/allergies';

describe('PatienController', () => {
  let patientService: PatientService;
  let patientRepo: typeof Patient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getModelToken(Patient),
          useValue: patientMockRepo,
        },
      ],
    }).compile();

    patientService = module.get<PatientService>(PatientService);
    patientRepo = module.get<typeof Patient>(getModelToken(Patient));
  });

  it('should be defined', () => {
    expect(patientService).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient', async () => {
      const spy = jest.spyOn(patientRepo, 'create');
      const patient = await patientService.create(createPatientDto);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(createPatientDto);
      expect(patient).toEqual({ ...createPatientDto, ...initialPatient });
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const spy = jest.spyOn(patientRepo, 'findAll');
      const patients = await patientService.findAll();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(patients).toEqual(mockedPatients);
    });
  });

  describe('findOne', () => {
    it('should return patient by user id', async () => {
      const spy = jest.spyOn(patientRepo, 'findByPk');
      const patient = await patientService.findOne(existingUserPatientId);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(patient).toEqual(mockedPatients[0]);
    });
  });

  describe('update', () => {
    it('should update patient by user id', async () => {
      const spy = jest.spyOn(patientRepo, 'update');
      const patient = await patientService.update(existingUserPatientId, updatePatientDto);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(updatePatientDto, {
        where: { user_id: existingUserPatientId },
        returning: true,
      });
      expect(patient).toEqual(updatedPatient);
    });
  });

  describe('remove', () => {
    it('should delete a patient', async () => {
      const spy = jest.spyOn(patientRepo, 'destroy');
      await patientService.remove(existingUserPatientId);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        where: { user_id: existingUserPatientId },
      });
    });
  });
});
