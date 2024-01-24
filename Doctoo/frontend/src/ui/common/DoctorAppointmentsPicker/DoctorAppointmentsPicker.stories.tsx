import { Meta, StoryObj } from '@storybook/react';
import DoctorAppointmentsPicker from './DoctorAppointmentsPicker';
import { Doctor } from 'src/types/doctor.types';
import { getRandomMockDoctor } from 'src/utils/mock-utils';

const meta: Meta<typeof DoctorAppointmentsPicker> = {
  title: 'UI/Common/DoctorAppointmentsPicker',
  component: DoctorAppointmentsPicker,
};

export default meta;

const doctor: Doctor = getRandomMockDoctor();

export const Primary: StoryObj<typeof DoctorAppointmentsPicker> = {
  render: () => <DoctorAppointmentsPicker doctor={doctor} />,
};
