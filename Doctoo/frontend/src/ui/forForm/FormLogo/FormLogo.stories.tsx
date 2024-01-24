import { Meta, Story } from '@storybook/react';
import FormLogo from './FormLogo';

const meta: Meta<typeof FormLogo> = {
  component: FormLogo,
  title: 'UI/forForm/FormLogo',
};

const Template: Story = args => <FormLogo {...args} />;

export const Primary = Template.bind({});

export default meta;
