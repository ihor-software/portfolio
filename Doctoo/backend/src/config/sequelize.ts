import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { User, UserSettings } from 'src/user';
import { Appointment } from 'src/appointment';
import * as process from 'process';
import { Doctor, Hospital, Specialty } from 'src/doctor';
import { Review } from 'src/review';
import { Patient } from 'src/patient';
import { MedicalCondition, PatientsMedicalCond } from 'src/medical-conditions';
import { Allergy, PatientsAllergies } from 'src/allergies';
import { Address } from 'src/address/entities/address.entity';
import { Country } from 'src/countries/entities/country.entity';
import { VirtualAssistantChatMessage } from 'src/virtual-assistant/entities/chat-message.entity';
import { Message } from '../message';
import { Chat } from 'src/chat/entities/chat.entity';

export const sequelizeDevelopmentConfig: SequelizeModuleOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.DB_PORT) || 5432,
  host: 'db',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [
    User,
    Appointment,
    Doctor,
    Hospital,
    Specialty,
    Review,
    Patient,
    MedicalCondition,
    Allergy,
    PatientsAllergies,
    PatientsMedicalCond,
    UserSettings,
    Address,
    Country,
    VirtualAssistantChatMessage,
    Message,
    Chat,
  ],
};

export const sequelizeTestConfig: SequelizeModuleOptions = {
  ...sequelizeDevelopmentConfig,
};
