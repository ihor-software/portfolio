import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Doctor, DoctorModule } from 'src/doctor';
import { ids, mockedDoctorService, testDoctorInput } from './doctor.mock';

const doctorApiPrefix = '/doctors';

describe('Doctors e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DoctorModule],
    })
      .overrideProvider(getModelToken(Doctor))
      .useValue(mockedDoctorService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(() => app.close());

  describe('/ (GET)', () => {
    it('should return array of doctors if there are doctors', () => {
      return request(app.getHttpServer())
        .get(`${doctorApiPrefix}/`)
        .expect(HttpStatus.OK)
        .expect([testDoctorInput]);
    });
  });

  describe('/:id (GET)', () => {
    it('should return a doctor by existing id', () => {
      return request(app.getHttpServer())
        .get(`${doctorApiPrefix}/${ids.valid}`)
        .expect(HttpStatus.OK)
        .expect(testDoctorInput);
    });

    it('should return 404 when trying to find a doctor by non existing id', () => {
      return request(app.getHttpServer())
        .get(`${doctorApiPrefix}/${ids.invalid}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/ (POST)', () => {
    it('should create new doctor', () => {
      return request(app.getHttpServer())
        .post(`${doctorApiPrefix}`)
        .send(testDoctorInput)
        .expect(HttpStatus.CREATED)
        .expect(testDoctorInput);
    });

    it('should return 400 when trying to create doctor with invalid properties', () => {
      return request(app.getHttpServer())
        .post(`${doctorApiPrefix}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/:id (PATCH)', () => {
    const updatedDoctor = { ...testDoctorInput, payrate: 50 };

    it('should update doctor`s info', () => {
      return request(app.getHttpServer())
        .patch(`${doctorApiPrefix}/${ids.valid}`)
        .send(updatedDoctor)
        .expect(HttpStatus.OK)
        .expect(updatedDoctor);
    });

    it('should return 404 when trying to update a doctor with wrong id', () => {
      return request(app.getHttpServer())
        .patch(`${doctorApiPrefix}/${ids.invalid}`)
        .send(updatedDoctor)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete doctor', () => {
      return request(app.getHttpServer())
        .delete(`${doctorApiPrefix}/${ids.valid}`)
        .expect(HttpStatus.OK);
    });

    it('should return 404 when trying to remove a nonexisting doctor', () => {
      return request(app.getHttpServer())
        .delete(`${doctorApiPrefix}/${ids.invalid}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
