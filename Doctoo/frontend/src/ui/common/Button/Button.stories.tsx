import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import './Button.module.css';
import icons from 'src/ui/common/Icon/iconPaths';

const meta: Meta<typeof Button> = {
  title: 'UI/Common/Button',
  component: Button,
};

type Story = StoryObj<typeof meta>;

const onClick = () => {};

export const ButtonMain: Story = {
  render: () => (
    <Button variant='main' onClick={onClick}>
      Button
    </Button>
  ),
};

export const ButtonSecondary: Story = {
  render: () => (
    <div className='flex gap-8'>
      <Button variant='secondary' onClick={onClick}>
        Button
      </Button>

      <Button variant='secondary' icon={icons.plus} onClick={onClick}>
        Add
      </Button>
    </div>
  ),
};

export const ButtonFlat: Story = {
  render: () => (
    <div className='flex gap-8'>
      <Button variant='flat' icon={icons.edit} onClick={onClick}>
        Edit
      </Button>
    </div>
  ),
};

export const ButtonMainDisabled: Story = {
  render: () => (
    <Button variant='main' disabled={true} onClick={onClick}>
      Button
    </Button>
  ),
};

export const ButtonSecondaryDisabled: Story = {
  render: () => (
    <Button variant='secondary' disabled={true} onClick={onClick}>
      Button
    </Button>
  ),
};

export default meta;
