import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { sequelizeDevelopmentConfig } from 'src/config';
import { UserModule, UserSettingsModule } from './user';

import { LoggingMiddleware } from './core/middleware/logging.middleware';
import { AuthenticationModule } from './authentication/authentication.module';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppointmentModule } from './appointment';
import { DoctorModule, HospitalModule, SpecialtyModule } from './doctor';
import { ReviewModule } from './review';
import { PatientModule } from './patient';
import { MailModule } from './mail';
import { FileModule } from './filesystem/file.module';
import { NotificationModule } from './notification';
import { TaskModule } from './scheluder/sheluder.module';
import { MedicalConditionModule } from './medical-conditions';
import { AllergyModule } from './allergies';
import { MessageModule } from './message/message.module';
import { VirtualAssistantModule } from './virtual-assistant/virtual-assistant.module';
import { SummarizationModule } from './summarization/summarization.module';
import { CountriesModule } from './countries/countries.module';
import { AddressModule } from './address/address.module';
import { PaymentModule } from './payment/payment.module';
import { PdfModule } from './pdf/pdf.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    UserModule,
    MailModule,
    DoctorModule,
    HospitalModule,
    SpecialtyModule,
    AppointmentModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
      }),
    }),
    AppointmentModule,
    SpecialtyModule,
    ReviewModule,
    PatientModule,
    FileModule,
    NotificationModule,
    MedicalConditionModule,
    AllergyModule,
    TaskModule,
    MessageModule,
    VirtualAssistantModule,
    UserSettingsModule,
    SummarizationModule,
    CountriesModule,
    AddressModule,
    ChatModule,
    PaymentModule,
    PdfModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
