import { Meta, StoryObj } from '@storybook/react';
import DoctorModal from './DoctorModal';
import { Doctor } from 'src/types/doctor.types';
import { useState } from 'react';
import { getRandomMockDoctor } from 'src/utils/mock-utils';

const meta: Meta<typeof DoctorModal> = {
  title: 'UI/Common/DoctorModal',
  component: DoctorModal,
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

const doctor: Doctor = getRandomMockDoctor();

export const Primary: StoryObj<typeof DoctorModal> = {
  render: () => {
    const [state, setState] = useState({ isOpened: true });

    return (
      <>
        {state.isOpened && (
          <DoctorModal
            isOpened={state.isOpened}
            doctor={doctor}
            onClose={() => setState({ ...state, isOpened: false })}
          />
        )}
      </>
    );
  },
};
