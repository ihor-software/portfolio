import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Appointment, AppointmentModule } from 'src/appointment';
import {
  appointments,
  existingId,
  invalidAppointment,
  mockedAppointmentModel,
  nonExistingId,
  testAppointment,
  updateAppointmentData,
  updatedAppointment,
} from './appointment.e2e.mock';
import * as request from 'supertest';

const appointmentApiPrefix = '/appointments';

describe('Appointments', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppointmentModule],
    })
      .overrideProvider(getModelToken(Appointment))
      .useValue(mockedAppointmentModel)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(() => app.close());

  describe('/ (GET)', () => {
    it('should return array of appointments if there are appointments', () => {
      return request(app.getHttpServer())
        .get(`${appointmentApiPrefix}/`)
        .expect(HttpStatus.OK)
        .expect(appointments);
    });
  });

  describe('/:id (GET)', () => {
    it('should return appointment by existing id', () => {
      return request(app.getHttpServer())
        .get(`${appointmentApiPrefix}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect(testAppointment);
    });

    it('should return 404 when trying to find appointment by non existing id', () => {
      return request(app.getHttpServer())
        .get(`${appointmentApiPrefix}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/ (POST)', () => {
    it('should create new appointment', () => {
      return request(app.getHttpServer())
        .post(`${appointmentApiPrefix}`)
        .send(testAppointment)
        .expect(HttpStatus.CREATED)
        .expect(testAppointment);
    });

    it('should return 400 when trying to create invalid appointment', () => {
      return request(app.getHttpServer())
        .post(`${appointmentApiPrefix}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when trying to create invalid appointment', () => {
      return request(app.getHttpServer())
        .post(`${appointmentApiPrefix}`)
        .send(invalidAppointment)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/:id (PATCH)', () => {
    it('should update an appointment', () => {
      return request(app.getHttpServer())
        .patch(`${appointmentApiPrefix}/${existingId}`)
        .send(updateAppointmentData)
        .expect(HttpStatus.OK)
        .expect(updatedAppointment);
    });

    it('should return 404 when trying to update an appointment with wrong id', () => {
      return request(app.getHttpServer())
        .patch(`${appointmentApiPrefix}/${nonExistingId}`)
        .send(updateAppointmentData)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete existing appointment', () => {
      return request(app.getHttpServer())
        .delete(`${appointmentApiPrefix}/${existingId}`)
        .expect(HttpStatus.OK);
    });

    it('should return 404 when trying to remove nonexisting appointment', () => {
      return request(app.getHttpServer())
        .delete(`${appointmentApiPrefix}/${nonExistingId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
