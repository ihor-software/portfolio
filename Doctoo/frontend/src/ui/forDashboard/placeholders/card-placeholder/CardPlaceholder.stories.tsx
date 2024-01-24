import type { Meta, StoryObj } from '@storybook/react';
import CardPlaceholder from './CardPlaceholder';

const meta: Meta<typeof CardPlaceholder> = {
  title: 'UI/DashboardPlaceholders/CardPlaceholder',
  component: CardPlaceholder,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CardPlaceholder />,
};

export default meta;
