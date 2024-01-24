import { Test, TestingModule } from '@nestjs/testing';
import {
  createPatientDto,
  existingUserPatientId,
  initialPatient,
  mockedPatients,
  patientMockService,
  updatePatientDto,
} from './patient.mock';
import { PatientController, PatientService } from 'src/patient';

describe('PatientController', () => {
  let patientController: PatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [PatientService],
    })
      .overrideProvider(PatientService)
      .useValue(patientMockService)
      .compile();

    patientController = module.get<PatientController>(PatientController);
  });

  it('should be defined', () => {
    expect(patientController).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient', async () => {
      const patient = await patientController.create(createPatientDto);
      expect(patient).toEqual({ ...createPatientDto, ...initialPatient });
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const patients = await patientController.findAll();
      expect(patients).toEqual(mockedPatients);
    });
  });

  describe('findOne', () => {
    it('should return patient by user id', async () => {
      const patient = await patientController.findOne(existingUserPatientId);
      expect(patient).toEqual(mockedPatients[0]);
    });
  });

  describe('update', () => {
    it('should update patient by user id', async () => {
      const updatedPatient = await patientController.update(
        existingUserPatientId,
        updatePatientDto,
      );
      expect(updatedPatient).toEqual(updatedPatient);
    });
  });

  describe('remove', () => {
    it('should delete a patient', async () => {
      await patientController.remove(existingUserPatientId);
      expect(patientMockService.remove).toHaveBeenCalledTimes(1);
      expect(patientMockService.remove).toHaveBeenCalledWith(existingUserPatientId);
    });
  });
});
