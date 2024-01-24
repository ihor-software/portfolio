import type { Meta, StoryObj } from '@storybook/react';
import MainLogo from './MainLogo';

const meta: Meta<typeof MainLogo> = {
  title: 'UI/Navigation/MainLogo',
  component: MainLogo,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
};

type Story = StoryObj<typeof meta>;

export const MainLogoBase: Story = {};
export const MainLogoMain: Story = {
  render: () => <MainLogo variant='main' />,
};

export default meta;
