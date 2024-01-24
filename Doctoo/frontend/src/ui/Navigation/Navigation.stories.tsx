import type { Meta, StoryObj } from '@storybook/react';
import Navigation from './Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'UI/Navigation/Navigation',
  component: Navigation,
};

type Story = StoryObj<typeof meta>;

export const NavigationMain: Story = {};

export default meta;
