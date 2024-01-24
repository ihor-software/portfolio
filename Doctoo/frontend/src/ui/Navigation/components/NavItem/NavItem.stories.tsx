import type { Meta, StoryObj } from '@storybook/react';
import NavItem from './NavItem';
import icons from 'src/ui/common/Icon/iconPaths';

const meta: Meta<typeof NavItem> = {
  title: 'UI/Navigation/NavItem',
  component: NavItem,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
};

type Story = StoryObj<typeof meta>;

export const NavItemMain: Story = {
  render: () => <NavItem icon={icons.account} label='Profile' link='/profile' />,
};

export const NavItemReduced: Story = {
  render: () => <NavItem icon={icons.account} label='Profile' link='/profile' reduced />,
};

export default meta;
