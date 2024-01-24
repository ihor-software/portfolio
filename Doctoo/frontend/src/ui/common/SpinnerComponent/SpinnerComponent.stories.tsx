import { Meta, StoryObj } from '@storybook/react';
import SpinnerComponent from './SpinnerComponent';

const meta: Meta<typeof SpinnerComponent> = {
  component: SpinnerComponent,
  title: 'UI/Common/SpinnerComponent',
};

type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  render: () => <SpinnerComponent />,
};

export default meta;
