import Toggle from './Toggle';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'UI/Common/Toggle',
  argTypes: {},
};

type StoryType = StoryObj<typeof meta>;

export const Base: StoryType = {};

export const Toggled: StoryType = {
  render: () => <Toggle isActive={true} onToggle={() => {}} />,
};

export default meta;
