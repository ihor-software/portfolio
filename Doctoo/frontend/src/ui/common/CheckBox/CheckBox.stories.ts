import { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'App/CheckBox',
  component: CheckBox,
  parameters: {
    tags: ['autodocs'],
  },
};

export default meta;

export const CheckedNonDisabledCheckBox: StoryObj<typeof CheckBox> = {
  args: {
    labelText: 'checked nondisabled checkbox',
    checked: true,
    disabled: false,
  },
};
export const CheckedDisabledCheckBox: StoryObj<typeof CheckBox> = {
  args: {
    labelText: 'checked disabled checkbox',
    checked: true,
    disabled: true,
  },
};
export const NonCheckedNonDisabledCheckBox: StoryObj<typeof CheckBox> = {
  args: {
    labelText: 'nonchecked nondisabled checkbox',
    checked: false,
    disabled: false,
  },
};
export const NonCheckedDisabledCheckBox: StoryObj<typeof CheckBox> = {
  args: {
    labelText: 'nonchecked disabled checkbox',
    checked: false,
    disabled: true,
  },
};
