import RadioButton from './RadioButton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioButton> = {
  title: 'App/RadioButton',
  component: RadioButton,
  parameters: {
    tags: ['autodocs'],
  },
};

export default meta;

export const CheckedNonDisabledRadioButton: StoryObj<typeof RadioButton> = {
  args: {
    checked: true,
    disabled: false,
  },
};
export const NonCheckedNonDisabledRadioButton: StoryObj<typeof RadioButton> = {
  args: {
    checked: false,
    disabled: false,
  },
};
export const NonCheckedDisabledRadioButton: StoryObj<typeof RadioButton> = {
  args: {
    checked: false,
    disabled: true,
  },
};
export const CheckedDisabledRadioButton: StoryObj<typeof RadioButton> = {
  args: {
    checked: true,
    disabled: true,
  },
};
