import { Meta, StoryObj } from '@storybook/react';
import FindDoctorForm from './FindDoctorForm';

const meta: Meta<typeof FindDoctorForm> = {
  title: 'UI/Forms/FindDoctorForm',
  component: FindDoctorForm,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;

export const PrimaryFindDoctorForm: StoryObj<typeof FindDoctorForm> = {
  render: () => {
    return (
      <FindDoctorForm
        onSubmit={data => {
          alert(`Find doctor form were submited with data: ${data.doctorOrSymptom}`);
        }}
      />
    );
  },
};
