import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as request from 'supertest';
import { UserModule } from 'src/user';
import { sequelizeTestConfig } from 'src/config';

import { testUserInput } from './user.mock';

const userApiPrefix = '/users';

describe('User (e2e)', () => {
  let app: INestApplication;
  let user_id: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        SequelizeModule.forRoot({
          ...sequelizeTestConfig,
          logging: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/ (POST)', () => {
    it('should create a user', async () => {
      const response = await request(app.getHttpServer())
        .post(`${userApiPrefix}/`)
        .send(testUserInput)
        .expect(HttpStatus.CREATED);

      user_id = response.body.id;
      expect(response.body.id).toEqual(expect.any(Number));
      expect(response.body.email).toEqual(testUserInput.email);
      expect(response.body.first_name).toEqual(testUserInput.first_name);
      expect(response.body.last_name).toEqual(testUserInput.last_name);
      expect(response.body.phone_number).toEqual(testUserInput.phone_number);
      expect(response.body.createdAt).toEqual(expect.any(String));
      expect(response.body.updatedAt).toEqual(expect.any(String));
    });

    it('should return 400 if password and password confirmation do not match', async () => {
      const response = await request(app.getHttpServer())
        .post(`${userApiPrefix}/`)
        .send({
          ...testUserInput,
          password_confirmation: 'wrongPassword',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.error).not.toBeNull();
    });
  });

  describe('/ (GET)', () => {
    it('should return array of users if there are users', async () => {
      const response = await request(app.getHttpServer())
        .get(`${userApiPrefix}/`)
        .expect(HttpStatus.OK);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toEqual(1);
    });
  });

  describe('/:id (GET)', () => {
    it('should return a user', async () => {
      const response = await request(app.getHttpServer())
        .get(`${userApiPrefix}/${user_id}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(expect.any(Number));
      expect(response.body.email).toEqual(testUserInput.email);
      expect(response.body.first_name).toEqual(testUserInput.first_name);
      expect(response.body.last_name).toEqual(testUserInput.last_name);
      expect(response.body.phone_number).toEqual(testUserInput.phone_number);
      expect(response.body.createdAt).toEqual(expect.any(String));
      expect(response.body.updatedAt).toEqual(expect.any(String));
    });

    it('should return 404 if user is not found', async () => {
      await request(app.getHttpServer()).get(`${userApiPrefix}/-1`).expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/:id (PATCH)', () => {
    const updatedEmail = 'newemail@mail.com';

    it('should update a user', async () => {
      const response = await request(app.getHttpServer())
        .patch(`${userApiPrefix}/${user_id}`)
        .send({
          email: updatedEmail,
          password: testUserInput.password,
          password_confirmation: testUserInput.password,
        })
        .expect(HttpStatus.OK);

      expect(response.body.email).toEqual(updatedEmail);
    });

    it('should return 400 if password and password confirmation do not match', async () => {
      const response = await request(app.getHttpServer())
        .patch(`${userApiPrefix}/${user_id}`)
        .send({
          email: updatedEmail,
          password: testUserInput.password,
          password_confirmation: 'wrongPassword',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.error).not.toBeNull();
    });

    it('should should return 400 if password is incorrect', async () => {
      const response = await request(app.getHttpServer())
        .patch(`${userApiPrefix}/${user_id}`)
        .send({
          email: updatedEmail,
          password: 'wrongPassword',
          password_confirmation: 'wrongPassword',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.error).not.toBeNull();
    });

    it('should return 404 if user is not found', async () => {
      await request(app.getHttpServer())
        .patch(`${userApiPrefix}/-1`)
        .send({
          email: 'updatedEmail@mail.com',
          password: testUserInput.password,
          password_confirmation: testUserInput.password,
        })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete a user', async () => {
      await request(app.getHttpServer())
        .delete(`${userApiPrefix}/${user_id}`)
        .expect(HttpStatus.OK);
    });

    it('should return 404 if user is not found', async () => {
      await request(app.getHttpServer()).delete(`${userApiPrefix}/-1`).expect(HttpStatus.NOT_FOUND);
    });
  });
});
