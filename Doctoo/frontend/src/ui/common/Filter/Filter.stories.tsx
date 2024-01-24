import { Meta, StoryObj } from '@storybook/react';
import Filter from './Filter';
import { useState } from 'react';

const meta: Meta<typeof Filter> = {
  title: 'UI/Common/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
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

const filters: string[] = ['All', 'Doctors', 'Patients'];

export const Primary: StoryObj<typeof Filter> = {
  render: () => {
    const [state, setState] = useState({ selectedValue: filters[0] });

    return (
      <div className='wrapper min-h-[200px]'>
        <Filter
          selectedValue={state.selectedValue}
          values={filters}
          onChange={selectedValue => {
            setState({ ...state, selectedValue });
          }}
        />
      </div>
    );
  },
};
