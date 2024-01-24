import { Meta, StoryObj } from '@storybook/react';
import Title from './Title';
import { Icon } from '../Icon';
import icons from '../Icon/iconPaths';
import FindDoctorForm from 'src/ui/FindDoctorForm/FindDoctorForm';

const meta: Meta<typeof Title> = {
  title: 'UI/Common/Title',
  component: Title,
  parameters: {
    backgrounds: {
      default: 'bg',
      values: [
        {
          name: 'bg',
          value: '#F1F6F9',
        },
      ],
    },
  },
};

export default meta;

export const AppointmentsTitle: StoryObj<typeof Title> = {
  render: () => {
    return (
      <Title
        titleIcon={<Icon src={icons.appointments} alt={'Appointments page'} iconColor='main' />}
        title='Appointments'
      >
        <FindDoctorForm
          onSubmit={data => alert(`Find doctor form data: ${data.doctorOrSymptom}`)}
        />
      </Title>
    );
  },
};
