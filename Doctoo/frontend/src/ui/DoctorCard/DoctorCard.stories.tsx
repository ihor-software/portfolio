import { Meta, StoryObj } from '@storybook/react';
import DoctorCard from './DoctorCard';
import doctor from '../../images/doctor.svg';
import { Doctor } from 'src/types/doctor.types';
import { getRandomMockDoctor } from 'src/utils/mock-utils';

const meta: Meta<typeof DoctorCard> = {
  component: DoctorCard,
  title: 'UI/DoctorCard',
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

type StoryType = StoryObj<typeof meta>;

const mockDoctor: Doctor = getRandomMockDoctor();

export const Search: StoryType = {
  render: () => <DoctorCard src={doctor} doctor={mockDoctor} option='search' />,
};

export const Saved: StoryType = {
  render: () => <DoctorCard src={doctor} doctor={mockDoctor} option='saved' />,
};

export default meta;
