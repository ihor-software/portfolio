import type { Meta, StoryObj } from '@storybook/react';
import SectionPlaceholder from './SectionPlaceholder';

const meta: Meta<typeof SectionPlaceholder> = {
  title: 'UI/DashboardPlaceholders/CardPlaceholder',
  component: SectionPlaceholder,
};

type Story = StoryObj<typeof meta>;

export const WithCard: Story = {
  render: () => <SectionPlaceholder cardsCount={3} />,
};

export const ForCalendar: Story = {
  render: () => <SectionPlaceholder cardsCount={0} />,
};

export const Grid: Story = {
  render: () => (
    <div className='grid gap-4 grid-cols-[2fr,1fr] grid-rows-2'>
      <div className='p-6 bg-white rounded-xl'>
        <SectionPlaceholder cardsCount={3} />
      </div>
      <div className='flex gap-4 row-span-2 flex-col'>
        <div className='p-6 bg-white w-full rounded-xl flex-1'>
          <SectionPlaceholder cardsCount={0} />
        </div>
        <div className='p-6 bg-white rounded-xl flex-2'>
          <SectionPlaceholder cardsCount={2} />
        </div>
      </div>
      <div className='p-6 bg-white rounded-xl'>
        <SectionPlaceholder cardsCount={3} />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
